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

    final UserRepository userRepository;
    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String userName) {
        return findByUsername(userName);
    }
}
