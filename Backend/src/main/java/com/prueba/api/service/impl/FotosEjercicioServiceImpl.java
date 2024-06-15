package com.prueba.api.service.impl;

import com.prueba.api.entity.FotosEjercicio;
import com.prueba.api.repository.EjercicioRepository;
import com.prueba.api.repository.FotosEjercicioRepository;
import com.prueba.api.service.FotosEjercicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class FotosEjercicioServiceImpl implements FotosEjercicioService {

    private final FotosEjercicioRepository fotosEjercicioRepository;

    @Override
    public List<FotosEjercicio> findAllByEjercicio_Id(String id) {
        return fotosEjercicioRepository.findAllByEjercicio_Id(id);
    }

    @Override
    public boolean deleteAllByEjercicio_Id(String id) {
        try {
            fotosEjercicioRepository.deleteAllByEjercicio_Id(id);
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
