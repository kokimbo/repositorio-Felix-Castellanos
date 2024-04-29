package com.prueba.api.auth;


import com.prueba.api.entity.Role;
import com.prueba.api.jwt.JwtService;
import com.prueba.api.entity.User;
import com.prueba.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final Environment env;



    public AuthResponse register(RegisterRequest request) {
        if(userService.findByUser(request.username).isPresent()){
            return AuthResponse.builder()
                    .err_exist(env.getProperty("err.user.exist"))
                    .build();
        }
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .provincia(request.getProvincia())
                .email(request.getEmail())
                .role(Role.ADMIN) //Aqui tengo que añadir mas roles para hacer pruebas      Falta lo de los granted authorities roles y demas
                .build();

        userService.saveUser(user);
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userService.findByUser(request.username);
        if(userOpt.isEmpty()){
            return AuthResponse.builder()
                    .err_exist(env.getProperty("err.user.noExist"))
                    .build();
        }
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            User user = userOpt.get();  //No entiendo porque pollas sale null
            String token = jwtService.getToken(user);
            return AuthResponse.builder()
                    .token(token)
                    .build();
        }catch (AuthenticationException e){
            System.out.println("Error -> "+e.getMessage());
            return AuthResponse.builder()
                    .err_password(env.getProperty("err.password.invalid"))
                    .build();
        }
    }
}
