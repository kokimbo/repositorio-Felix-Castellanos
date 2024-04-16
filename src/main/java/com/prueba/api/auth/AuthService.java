package com.prueba.api.auth;


import com.prueba.api.entity.Role;
import com.prueba.api.jwt.JwtService;
import com.prueba.api.entity.User;
import com.prueba.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;
    private final UserService userService;

    public AuthResponse login(LoginRequest request) {
        return null;
    }

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .name(request.getName())
                .provincia(request.getProvincia())
                .role(Role.USER)
                .build();

        userService.saveUser(user);
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }
}
