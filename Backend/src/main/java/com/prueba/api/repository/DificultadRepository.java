package com.prueba.api.repository;

import com.prueba.api.entity.Dificultad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DificultadRepository extends JpaRepository<Dificultad, Long> {
    @Override
    List<Dificultad> findAll();

    Optional<Dificultad> findByNomDificultad(String nombre);
}
