package com.prueba.api.service;

import com.prueba.api.entity.User;

import java.util.Optional;

public interface UserService {
    void saveUser(User user);
    Optional<User> findByUser(String userName);
    Optional<User> findById(String id);
}
