package com.musichouse.api.music.dto.dto_entrance;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CharacteristicDtoEntrance {

    @NotNull(message = "El material es obligatorio")
    @Size(max = 50, message = "El material no puede tener más de {max} caracteres")
    private String material;


    @NotNull(message = "El número de trastes es obligatorio")
    @Min(value = 0, message = "El número de trastes debe ser un valor positivo")
    private Long frets;


    @NotNull(message = "La longitud de la escala es obligatoria")
    @Size(max = 50, message = "La longitud de la escala no puede tener más de {max} caracteres")
    private String scaleLength;


    @NotNull(message = "El número de cuerdas es obligatorio")
    @Min(value = 0, message = "El número de cuerdas debe ser un valor positivo")
    private Long numberOfStrings;


    @NotNull(message = "El tipo de cuerdas es obligatorio")
    @Size(max = 50, message = "El tipo de cuerdas no puede tener más de {max} caracteres")
    private String typeOfStrings;


    @NotNull(message = "El país de origen es obligatorio")
    @Size(max = 50, message = "El país de origen no puede tener más de 50 caracteres")
    private String originCountry;
}
