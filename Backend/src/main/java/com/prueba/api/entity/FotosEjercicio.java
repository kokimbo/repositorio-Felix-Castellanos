package com.prueba.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "fotosEjercicio")
public class FotosEjercicio {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String foto;

    @ManyToOne
    @JoinColumn(name = "ejercicio_id")
    private Ejercicio ejercicio;
}
