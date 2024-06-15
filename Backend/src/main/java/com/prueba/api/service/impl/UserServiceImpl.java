package com.prueba.api.service.impl;

import com.prueba.api.entity.User;
import com.prueba.api.repository.UserRepository;
import com.prueba.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Override
    public void saveUser(User user) {
        userRepository.saveAndFlush(user);
    }

    @Override
    public Optional<User> findByUser(String userName) {
        return userRepository.findByUsername(userName);
    }

    @Override
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean delete(User user) {
        userRepository.delete(user);
        userRepository.flush();
        return true;
    }

    @Override
    public Optional<User> findByUserEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public boolean deleteByUsername(String username) {
        userRepository.deleteByUsername(username);
        userRepository.flush();
        return true;
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public String findFotoByUsername(String username) {
        return userRepository.findFotoByUsername(username);
    }
}
