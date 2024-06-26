package com.prueba.api.service;

import com.prueba.api.entity.User;

import java.util.Optional;

public interface UserService {
    void saveUser(User user);
    Optional<User> findByUser(String userName);
    Optional<User> findById(String id);
    boolean delete(User user);
    Optional<User> findByUserEmail(String email);
    boolean deleteByUsername(String username);
    boolean existsByUsername(String username);
    String findFotoByUsername(String username);
}
