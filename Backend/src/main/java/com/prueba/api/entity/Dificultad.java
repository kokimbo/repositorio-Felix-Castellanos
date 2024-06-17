package com.prueba.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreType;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
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

        @JsonIgnoreProperties("dificultad")
        @OneToMany(mappedBy = "dificultad", fetch = FetchType.EAGER)
        private List<Ejercicio> ejercicios = new ArrayList<>();
}
