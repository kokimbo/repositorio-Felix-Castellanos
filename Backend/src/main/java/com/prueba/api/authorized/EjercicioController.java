package com.prueba.api.authorized;

import com.google.gson.Gson;
import com.prueba.api.auth.RegisterRequest;
import com.prueba.api.entity.Dificultad;
import com.prueba.api.entity.Ejercicio;
import com.prueba.api.entity.FotosEjercicio;
import com.prueba.api.entity.User;
import com.prueba.api.entity.dto.EjercicioDTO;
import com.prueba.api.fileUpload.FileUploadEjercicios;
import com.prueba.api.jwt.JwtService;
import com.prueba.api.service.DificultadService;
import com.prueba.api.service.EjercicioService;
import com.prueba.api.service.FotosEjercicioService;
import com.prueba.api.service.UserService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/v1/ejercicio")
@CrossOrigin(origins = "${app.cors.allowedOrigin}")
@RequiredArgsConstructor
public class EjercicioController {
    private final EjercicioService ejercicioService;
    private final DificultadService dificultadService;
    private final FotosEjercicioService fotosEjercicioService;
    private final UserService userService;
    private final JwtService jwtService;
    private final Environment env;

    @GetMapping("{idEjercicio}")        //@RequestHeader("Authorization") String header, Esto se puede hacer cuando le envio el header a mano
    public ResponseEntity<?> getEjercicio(@PathVariable String idEjercicio) {

        EjercicioDTO ejercicioDTO = null;
        Optional<Ejercicio> ejercicioOPT = ejercicioService.findById(idEjercicio);
        if (ejercicioOPT.isPresent()) {
            ejercicioDTO = EjercicioDTO.ejercicioToDto(ejercicioOPT.get());
        }

        if (ejercicioDTO != null){
            return ResponseEntity.status(HttpStatus.OK).body(ejercicioDTO);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ejercicioDTO);
    }

    @GetMapping()
    public ResponseEntity<?> getAllEjercicio() {
        List<Ejercicio> ejercicios = ejercicioService.findAll();

        List<EjercicioDTO> ejerciciosDTO = ejercicios.stream().map(EjercicioDTO::ejercicioToDto).toList();

        if(ejerciciosDTO!=null && !ejerciciosDTO.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(ejerciciosDTO);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("{idEjercicio}")
    public ResponseEntity<?> deleteEjercicio(@RequestHeader("Authorization") String header ,@PathVariable String idEjercicio) {
        Claims claims = jwtService.getClaims(header.substring(7));
        String idUserSession = (String) claims.get("idUser");



        Optional<Ejercicio> ejercicioOPT = ejercicioService.findById(idEjercicio);
        Ejercicio ejer = null;

        if (ejercicioOPT.isPresent() && ejercicioOPT.get().getUser().getId().equals(idUserSession)){
            if(ejercicioService.deleteById(idEjercicio)){
                return ResponseEntity.status(HttpStatus.OK).body(200);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping()
    public ResponseEntity<?> updateEjercicio(@RequestHeader("Authorization") String header, @RequestBody EjercicioDTO ejercicio) {
        Claims claims = jwtService.getClaims(header.substring(7));
        String idUserSession = (String) claims.get("idUser");

        User user = userService.findById(idUserSession).get();


        if (ejercicio!=null && ejercicio.getUser().getId().equals(idUserSession)){

            Ejercicio ejer = Ejercicio.builder()
                    .id(ejercicio.getId())
                    .user(user)
                    .nombre(ejercicio.getNombre())
                    .descripcion(ejercicio.getDescripcion())
                    .build();

        if (ejercicioService.saveUpdate(ejer)!=null) {
                return ResponseEntity.status(HttpStatus.OK).body("Succesfully update ejercicio");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping(value = "count/{idUser}")
    public ResponseEntity<?> countEjerciciosByIdUser(@PathVariable String idUser) {
        Integer numEjercicios = ejercicioService.countEjeciciosById(idUser);

        if (numEjercicios!=null){
            return ResponseEntity.status(HttpStatus.OK).body(numEjercicios);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping(value = "user/{idUser}")
    public ResponseEntity<?> ejerciciosByIdUser(@PathVariable String idUser) {
        List<Ejercicio> ejerciciosByUser = ejercicioService.findAllByIdUser(idUser);

        if (ejerciciosByUser!=null){
            return ResponseEntity.status(HttpStatus.OK).body(ejerciciosByUser);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }


    @PostMapping()
    public ResponseEntity<?> saveEjercicio(@RequestParam("ejercicio") String ejercicioString,  @RequestParam(name="files", required = false) MultipartFile[] file) {
        Gson gson = new Gson();
        EjercicioDTO ejercicio = gson.fromJson(ejercicioString, EjercicioDTO.class);

        Ejercicio ejer = null;
        if(ejercicio!=null){
            ejer = EjercicioDTO.dtoToEjercicio(ejercicio);
        }

        Optional<User> user = userService.findByUser(ejercicio.getUser().getUsername());
        Optional<Dificultad> dificultad = dificultadService.findByNombre(ejercicio.getDificultad().getNomDificultad());



        EjercicioDTO ejerResponse = null;
        if (user.isPresent() && dificultad.isPresent() && ejer!=null) {
            ejer.setUser(user.get());
            ejer.setDificultad(dificultad.get());
            Ejercicio ejercicioSave = ejercicioService.saveUpdate(ejer);
            List<FotosEjercicio> nuevoArrFotos = new ArrayList<>();
            for (MultipartFile filezilla : file){
                String nombreFile = FileUploadEjercicios.uploadFile(filezilla);
                FotosEjercicio newFotico = FotosEjercicio.builder().foto(nombreFile).ejercicio(ejercicioSave).build();
                fotosEjercicioService.save(newFotico);
                nuevoArrFotos.add(newFotico);
            }
            ejercicioSave.setFotosEjercicio(nuevoArrFotos);
            ejerResponse = EjercicioDTO.ejercicioToDto(ejercicioSave);
            return ResponseEntity.status(HttpStatus.OK).body(ejerResponse);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
