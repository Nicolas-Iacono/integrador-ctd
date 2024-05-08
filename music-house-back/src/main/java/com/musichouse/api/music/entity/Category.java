package com.musichouse.api.music.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "category")
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    /**
     * Identificador único de la categoría.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_category")
    private Long idCategory;

    /**
     * Nombre de la categoría.
     */
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    /**
     * Descripción de la categoría.
     */
    @Column(name = "description", nullable = false, length = 255)
    private String description;
}
