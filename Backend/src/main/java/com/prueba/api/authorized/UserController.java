package com.prueba.api.authorized;

import com.prueba.api.entity.User;
import com.prueba.api.entity.dto.UserDTO;
import com.prueba.api.fileUpload.FileRemover;
import com.prueba.api.jwt.JwtService;
import com.prueba.api.service.UserService;
import lombok.RequiredArgsConstructor;
import io.jsonwebtoken.Claims;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "${app.cors.allowedOrigin}")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final Environment env;

    @PostMapping(value = "welcome")
    public ResponseEntity<?> welcome(@RequestHeader("Authorization") String header){
        Map<String, Object> response = new HashMap<>();

        Claims claims = jwtService.getClaims(header.substring(7));
        String prueba = (String) claims.get("idUser");

        response.put("claims", claims);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "{idUser}")
    public ResponseEntity<?> userById(@PathVariable String idUser) {
        Optional<User> optUser = userService.findById(idUser);

        if (optUser.isEmpty()){
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", env.getProperty("err.invalid.id") + " - Error select");
            response.put("user", null);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        User user = optUser.get();
        UserDTO userDTO = UserDTO.userToDto(user);

        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    //Cuando el delete es exitoso, tengo que devolver una respuesta, no un objeto
    @DeleteMapping(value = "{username}")
    public ResponseEntity<?> delete(@PathVariable String username) {
        Map<String, Object> response = new HashMap<>();
        if (!userService.existsByUsername(username)){
            response.put("error", "No se pudo realizar la accion");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        String fotoBorrar = userService.findFotoByUsername(username);
        response.put("OK", "Correcto");
        userService.deleteByUsername(username);
        FileRemover.deleteFile(fotoBorrar);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


}
