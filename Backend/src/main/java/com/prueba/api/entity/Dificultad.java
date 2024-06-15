package com.prueba.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "dificultad")
public class Dificultad {
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private String id;

        @Column(nullable = false, unique = true)
        private String nomDificultad;

        @OneToMany(mappedBy = "dificultad")
        private ArrayList<Ejercicio> ejercicios;
}
