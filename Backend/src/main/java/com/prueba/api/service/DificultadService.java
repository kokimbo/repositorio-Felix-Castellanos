package com.prueba.api.service;

import com.prueba.api.entity.Dificultad;

import java.util.List;
import java.util.Optional;

public interface DificultadService {
    List<Dificultad> findAll();
    Optional<Dificultad> findByNombre(String nombre);
}
