package com.prueba.api.entity.dto;

import com.prueba.api.entity.Dificultad;
import com.prueba.api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DificultadDTO {

    private String id;
    private String nomDificultad;

    public static DificultadDTO dificultadToDto(Dificultad dificultad){
        return DificultadDTO.builder()
                .id(dificultad.getId())
                .nomDificultad(dificultad.getNomDificultad())
                .build();
    }

    public static Dificultad dtoToDificultad(DificultadDTO dificultad){
        return Dificultad.builder()
                .id(dificultad.getId())
                .nomDificultad(dificultad.getNomDificultad())
                .build();
    }

}
