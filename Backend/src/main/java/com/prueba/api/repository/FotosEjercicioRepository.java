package com.prueba.api.repository;

import com.prueba.api.entity.Ejercicio;
import com.prueba.api.entity.FotosEjercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FotosEjercicioRepository extends JpaRepository<FotosEjercicio, Long> {
    List<FotosEjercicio> findAllByEjercicio_Id(String id);
    void deleteAllByEjercicio_Id(String id);
}
