package com.prueba.api.entity.dto;


import com.prueba.api.entity.Dificultad;
import com.prueba.api.entity.Ejercicio;
import com.prueba.api.entity.FotosEjercicio;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EjercicioDTO {
    private String id;
    private String nombre;
    private String descripcion;
    private Date fechaCreacion;
    private DificultadDTO dificultad;
    private UserDTO user;
    private List<String> fotos;


    public static EjercicioDTO ejercicioToDto(Ejercicio ejercicio){
        return EjercicioDTO.builder()
                .id(ejercicio.getId())
                .nombre(ejercicio.getNombre())
                .descripcion(ejercicio.getDescripcion())
                .fechaCreacion(ejercicio.getFechaCreacion())
                .dificultad(DificultadDTO.dificultadToDto(ejercicio.getDificultad()))
                .user(UserDTO.userToDto(ejercicio.getUser()))
                .fotos(ejercicio.getFotosEjercicio()
                        .stream()
                        .map(FotosEjercicio::getFoto)
                        .toList())
                .build();
    }

    public static Ejercicio dtoToEjercicio(EjercicioDTO ejercicio){
        return Ejercicio.builder()
                .id(ejercicio.getId())
                .nombre(ejercicio.getNombre())
                .descripcion(ejercicio.getDescripcion())
                .fechaCreacion(ejercicio.getFechaCreacion())
                .dificultad(DificultadDTO.dtoToDificultad(ejercicio.getDificultad()))
                .user(UserDTO.dtoToUser(ejercicio.getUser()))
                .build();
    }
}

