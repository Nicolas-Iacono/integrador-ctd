package com.musichouse.api.music.dto.dto_modify;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class InstrumentDtoModify {
    @NotNull(message = "El id del instrumento es obligatorio")
    private Long idInstrument;
    @NotBlank(message = "El nombre del instrumento es obligatorio")
    @Size(max = 100, message = "El nombre del instrumento debe tener como máximo {max} caracteres")
    private String name;
    @Size(max = 255, message = "La descripción del instrumento debe tener como máximo {max} caracteres")
    private String description;
    @NotNull(message = "El peso del instrumento es obligatorio")
    @PositiveOrZero(message = "El peso debe ser positivo o cero")
    private BigDecimal weight;
    @NotNull(message = "Las medidas  del instrumento es obligatorio")
    private String measures;
    @NotNull(message = "El precio de alquiler es obligatorio")
    @PositiveOrZero(message = "El precio de alquiler debe ser positivo o cero")
    private BigDecimal rentalPrice;
    @NotNull(message = "El id de la categoría es obligatorio")
    private Long idCategory;
    @NotNull(message = "El id de la tematica es obligatorio")
    private Long idTheme;


}
