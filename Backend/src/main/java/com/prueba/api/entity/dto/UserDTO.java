package com.prueba.api.entity.dto;

import com.prueba.api.entity.Ejercicio;
import com.prueba.api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String id;
    private String username;
    private String email;
    private String name;
    private String foto;

    public static UserDTO userToDto(User user){
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .name(user.getName())
                .foto(user.getFoto())
                .build();
    }

    public static User dtoToUser(UserDTO user){
        return User.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .name(user.getName())
                .foto(user.getFoto())
                .build();
    }
}
