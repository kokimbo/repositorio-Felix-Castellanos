package com.prueba.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
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
    @JsonIgnoreProperties("fotosEjercicio")
    @JoinColumn(name = "ejercicio_id")
    private Ejercicio ejercicio;
}
