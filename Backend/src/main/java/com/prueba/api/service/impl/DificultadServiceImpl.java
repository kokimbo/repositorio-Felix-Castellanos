package com.prueba.api.service.impl;

import com.prueba.api.entity.Dificultad;
import com.prueba.api.repository.DificultadRepository;
import com.prueba.api.service.DificultadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DificultadServiceImpl implements DificultadService {

    private final DificultadRepository dificultadRepository;

    @Override
    public List<Dificultad> findAll() {
        return dificultadRepository.findAll();
    }
}
