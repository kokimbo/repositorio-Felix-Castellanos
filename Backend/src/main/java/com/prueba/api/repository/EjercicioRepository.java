package com.prueba.api.repository;

import com.prueba.api.entity.Dificultad;
import com.prueba.api.entity.Ejercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface EjercicioRepository  extends JpaRepository<Ejercicio, Long> {
    @Override
    ArrayList<Ejercicio> findAll();
    Optional<Ejercicio> findByNombre(String nombre);
    Optional<Ejercicio> findById(String id);
    List<Ejercicio> findAllByDificultad_Id(String idDificultad);
    void deleteByNombre(String nombre);
    void deleteById(String id);
}
