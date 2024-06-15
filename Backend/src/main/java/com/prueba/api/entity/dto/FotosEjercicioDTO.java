package com.prueba.api.entity.dto;

import com.prueba.api.entity.Ejercicio;
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
}
