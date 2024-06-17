package com.prueba.api.authorized;

import com.prueba.api.entity.Dificultad;
import com.prueba.api.entity.User;
import com.prueba.api.entity.dto.UserDTO;
import com.prueba.api.fileUpload.FileRemover;
import com.prueba.api.jwt.JwtService;
import com.prueba.api.service.DificultadService;
import com.prueba.api.service.UserService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/dificultad")
@CrossOrigin(origins = "${app.cors.allowedOrigin}")
@RequiredArgsConstructor
public class DificultadController {

    private final DificultadService dificultadService;
    private final JwtService jwtService;
    private final Environment env;


    @GetMapping()
    public ResponseEntity<?> getAll() {
        List<Dificultad> dificultades = dificultadService.findAll();

        if (dificultades!=null && dificultades.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(dificultades);
    }
}
