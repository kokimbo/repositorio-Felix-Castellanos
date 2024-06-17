package com.prueba.api.service;

import com.prueba.api.entity.FotosEjercicio;

import java.util.List;

public interface FotosEjercicioService {
    List<FotosEjercicio> findAllByEjercicio_Id(String id);
    boolean deleteAllByEjercicio_Id(String id);
    void save(FotosEjercicio fotosEjercicio);
}
