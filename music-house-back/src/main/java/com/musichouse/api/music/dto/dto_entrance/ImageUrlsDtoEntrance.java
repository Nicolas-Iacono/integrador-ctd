package com.musichouse.api.music.dto.dto_entrance;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ImageUrlsDtoEntrance {
    @NotBlank(message = "La URL de la imagen no puede estar vacía")
    @Size(max = 255, message = "La longitud máxima de la URL de la imagen es de 255 caracteres")
    private String imageUrl;
    @NotNull(message = "El id del instrumento es obligatorio")
    private Long idInstrument;
}