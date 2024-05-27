package com.prueba.api.service.impl;

import com.prueba.api.entity.User;
import com.prueba.api.repository.UserRepository;
import com.prueba.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
