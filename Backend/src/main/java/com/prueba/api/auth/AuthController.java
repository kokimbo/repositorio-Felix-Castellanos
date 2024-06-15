package com.prueba.api.auth;

import com.google.gson.Gson;
import com.prueba.api.fileUpload.FileUpload;
import com.prueba.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "${app.cors.allowedOrigin}")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        AuthResponse authResponse = authService.login(request);

        if (authResponse.getToken()==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(authResponse);
        }

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping(value = "register", consumes = { "multipart/form-data" })
    public ResponseEntity<AuthResponse> register(@RequestParam("registro") String requestString, @RequestParam(name="file", required = false) MultipartFile file){
        String fotoDB = "";
        Gson gson = new Gson();
        RegisterRequest registro = gson.fromJson(requestString, RegisterRequest.class);

        if (file!=null){
            fotoDB = FileUpload.uploadFile(file);
        }

        AuthResponse authResponse = authService.register(registro, fotoDB);

        if (authResponse.getToken()==null) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(authResponse);
        }
        return ResponseEntity.ok(authResponse);
    }

    @PutMapping(value = "update", consumes = { "multipart/form-data" })
    public ResponseEntity<AuthResponse> update(@RequestParam("registro") String requestString,
                                               @RequestParam(name="file", required = false) MultipartFile file,
                                               @RequestParam(name = "usernameSession") String username)
    {
        AuthResponse authResponse = null;

        if(userService.deleteByUsername(username)){
            String fotoDB = "";
            Gson gson = new Gson();
            RegisterRequest registro = gson.fromJson(requestString, RegisterRequest.class);

            if (file!=null){
                fotoDB = FileUpload.uploadFile(file);
            }

            authResponse = authService.update(registro, fotoDB);
            return ResponseEntity.status(HttpStatus.OK).body(authResponse);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(authResponse);
    }
}
