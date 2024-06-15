package com.prueba.api.entity.dto;

import com.prueba.api.entity.Ejercicio;
import com.prueba.api.entity.FotosEjercicio;
import com.prueba.api.service.EjercicioService;
import com.prueba.api.service.impl.EjercicioServiceImpl;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EjercicioDTO {
    private String id;
    private String nombre;
    private String dificultad;
    private String descripcion;
    private UserDTO user;

}

