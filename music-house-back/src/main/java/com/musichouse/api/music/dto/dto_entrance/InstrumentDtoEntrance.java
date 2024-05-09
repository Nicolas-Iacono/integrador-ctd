package com.musichouse.api.music.dto.dto_entrance;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class InstrumentDtoEntrance {
    @NotBlank(message = "El nombre del instrumento es obligatorio")
    @Size(max = 100, message = "El nombre del instrumento debe tener como máximo {max} caracteres")
    private String name;
    @Size(max = 255, message = "La descripción del instrumento debe tener como máximo {max} caracteres")
    private String description;
    @NotNull(message = "El precio de alquiler es obligatorio")
    @PositiveOrZero(message = "El precio de alquiler debe ser positivo o cero")
    private BigDecimal rentalPrice;
    @NotNull(message = "el ID de la categoria no deve estar en blanco")
    private Long idCategory;
    @NotNull(message = "Debe cargar al menos una imagen al crear el instrumento")
    private List<String> imageUrls;

}
