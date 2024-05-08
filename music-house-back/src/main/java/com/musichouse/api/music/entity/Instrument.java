package com.musichouse.api.music.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Representa un instrumento musical disponible para alquiler.
 */

/**
 * Representa un instrumento musical disponible para alquiler.
 */
@Entity
@Data
@Table(name = "instrument")
@AllArgsConstructor
@NoArgsConstructor
public class Instrument {
    /**
     * Identificador único del instrumento.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_instrument")
    private Long idInstrument;

    /**
     * Nombre del instrumento.
     */
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    /**
     * Descripción detallada del instrumento.
     */
    @Column(name = "description", length = 255)
    private String description;

    /**
     * Precio de alquiler del instrumento.
     * Precision: 10 dígitos.
     * Escala: 2 decimales.
     */
    @Column(name = "rental_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal rentalPrice;

    /**
     * URL de la imagen del instrumento.
     */
    @Column(name = "image_url", length = 255)
    private String imageUrl;

    /**
     * Categoría a la que pertenece el instrumento.
     */
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_category")
    private Category category;
}
