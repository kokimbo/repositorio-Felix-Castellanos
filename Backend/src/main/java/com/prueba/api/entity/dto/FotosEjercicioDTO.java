package com.prueba.api.entity.dto;

import com.prueba.api.entity.Ejercicio;
import com.prueba.api.entity.FotosEjercicio;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FotosEjercicioDTO {
    private String id;
    private String foto;
    private EjercicioDTO ejercicio;

    public static FotosEjercicioDTO fotosEjercicioToDto(FotosEjercicio fotosEjercicio){
        return FotosEjercicioDTO.builder()
                .id(fotosEjercicio.getId())
                .foto(fotosEjercicio.getFoto())
                .ejercicio(EjercicioDTO.ejercicioToDto(fotosEjercicio.getEjercicio()))
                .build();
    }
}
