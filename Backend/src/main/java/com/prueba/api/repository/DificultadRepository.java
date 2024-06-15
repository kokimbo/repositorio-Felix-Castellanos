package com.prueba.api.repository;

import com.prueba.api.entity.Dificultad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DificultadRepository extends JpaRepository<Dificultad, Long> {
    @Override
    List<Dificultad> findAll();
}
