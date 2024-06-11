package com.prueba.api.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowedOrigin}")
public class AuthController {

    private final AuthService authService;

    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        AuthResponse authResponse = authService.login(request);

        if (authResponse.getToken()==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(authResponse);
        }

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request){
        AuthResponse authResponse = authService.register(request);

        if (authResponse.getToken()==null) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(authResponse);
        }
        return ResponseEntity.ok(authResponse);
    }
}
