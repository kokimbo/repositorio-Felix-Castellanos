package com.prueba.api.authorized;

import com.prueba.api.entity.Dificultad;
import com.prueba.api.entity.Ejercicio;
import com.prueba.api.entity.User;
import com.prueba.api.entity.dto.EjercicioDTO;
import com.prueba.api.jwt.JwtService;
import com.prueba.api.service.EjercicioService;
import com.prueba.api.service.UserService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/ejercicio")
@CrossOrigin(origins = "${app.cors.allowedOrigin}")
@RequiredArgsConstructor
public class EjercicioController {
    private final EjercicioService ejercicioService;
    private final UserService userService;
    private final JwtService jwtService;
    private final Environment env;

    @GetMapping("{idEjercicio}")
    public ResponseEntity<?> getEjercicio(@PathVariable String idEjercicio) {

        Optional<Ejercicio> ejercicioOPT = ejercicioService.findById(idEjercicio);
        Ejercicio ejer = null;
        if (ejercicioOPT.isPresent()){
            ejer = ejercicioOPT.get();
            return ResponseEntity.status(HttpStatus.OK).body(ejer);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping()
    public ResponseEntity<?> getAllEjercicio() {
        List<Ejercicio> ejercicios = ejercicioService.findAll();
        if(!ejercicios.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(ejercicios);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("{idEjercicio}")
    public ResponseEntity<String> deleteEjercicio(@RequestHeader("Authorization") String header ,@PathVariable String idEjercicio) {
        Claims claims = jwtService.getClaims(header.substring(7));
        String idUserSession = (String) claims.get("idUser");

        Optional<Ejercicio> ejercicioOPT = ejercicioService.findById(idEjercicio);
        Ejercicio ejer = null;

        if (ejercicioOPT.isPresent() && ejercicioOPT.get().getUser().getId().equals(idUserSession)){
            if(ejercicioService.deleteById(idEjercicio)){
                return ResponseEntity.status(HttpStatus.OK).body("Succesfully deleted ejercicio");
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

        if (ejercicioService.saveUpdate(ejer)) {
                return ResponseEntity.status(HttpStatus.OK).body("Succesfully update ejercicio");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping()
    public ResponseEntity<String> saveEjercicio(@RequestParam("ejercicio") EjercicioDTO ejercicio,  @RequestParam(name="files", required = false) MultipartFile[] file) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
