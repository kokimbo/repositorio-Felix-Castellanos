package com.prueba.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ejercicio")
public class Ejercicio {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String nombre;
    private String descripcion;
    private Date fechaCreacion;

    @OneToMany(mappedBy = "ejercicio", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("ejercicio")
    private List<FotosEjercicio> fotosEjercicio = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("ejercicios")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("ejercicios")
    @JoinColumn(name = "dificultad_id", nullable = false)
    private Dificultad dificultad;
}
