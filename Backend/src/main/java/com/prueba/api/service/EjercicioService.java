package com.prueba.api.service;

import com.prueba.api.entity.Ejercicio;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface EjercicioService {
    Ejercicio saveUpdate(Ejercicio ejercicio);
    Optional<Ejercicio> findByNombre(String nombreEjercicio);
    Optional<Ejercicio> findById(String idEjercicio);
    boolean deleteByNombre(String nombreEjercicio);
    boolean deleteById(String idEjercicio);
    ArrayList<Ejercicio> findAll();
    Integer countEjeciciosById(String idUser);
    List<Ejercicio> findAllByIdUser(String idUser);
}
