package com.prueba.api.service.impl;

import com.prueba.api.entity.Ejercicio;
import com.prueba.api.entity.User;
import com.prueba.api.repository.EjercicioRepository;
import com.prueba.api.repository.UserRepository;
import com.prueba.api.service.EjercicioService;
import com.prueba.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EjercicioServiceImpl implements EjercicioService {

    private final EjercicioRepository ejercicioRepository;


    @Override
    public Ejercicio saveUpdate(Ejercicio ejercicio) {
        try {
            Ejercicio ejer = ejercicioRepository.save(ejercicio);
            return ejer;
        }catch (DataAccessException e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public Optional<Ejercicio> findByNombre(String nombreEjercicio) {
        return ejercicioRepository.findByNombre(nombreEjercicio);
    }

    @Override
    public Optional<Ejercicio> findById(String idEjercicio) {
        return ejercicioRepository.findById(idEjercicio);
    }

    @Override
    public boolean deleteByNombre(String nombreEjercicio) {
        Optional<Ejercicio> ejer = ejercicioRepository.findByNombre(nombreEjercicio);
        if (ejer.isPresent()) {
            ejercicioRepository.delete(ejer.get());
            ejercicioRepository.flush();
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean deleteById(String idEjercicio) {
        try {
            ejercicioRepository.deleteById(idEjercicio);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
        return true;
    }

    @Override
    public ArrayList<Ejercicio> findAll() {
        return ejercicioRepository.findAll();
    }

    @Override
    public Integer countEjeciciosById(String idUser) {
        return ejercicioRepository.countEjeciciosById(idUser);
    }

    @Override
    public List<Ejercicio> findAllByIdUser(String idUser) {
        return ejercicioRepository.findAllByUser_Id(idUser);
    }
}
