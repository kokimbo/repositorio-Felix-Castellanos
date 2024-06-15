package com.prueba.api.repository;

import com.prueba.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findById(String id);
    Optional<User> findByEmail(String email);
    void deleteByUsername(String id);
    boolean existsByUsername(String username);
    @Query("SELECT u.foto FROM User u WHERE u.username = :username")
    String findFotoByUsername(@Param("username") String username);
}
