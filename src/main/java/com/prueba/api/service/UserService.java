package com.prueba.api.service;

import com.prueba.api.entity.User;

import java.util.Optional;

public interface UserService {
    void saveUser(User user);
    Optional<User> findByUsername(String userName);
}
