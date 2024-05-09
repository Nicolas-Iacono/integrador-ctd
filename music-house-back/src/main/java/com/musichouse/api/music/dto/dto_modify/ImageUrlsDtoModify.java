package com.musichouse.api.music.dto.dto_modify;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ImageUrlsDtoModify {
    @NotNull(message = "El id de la Imagen Urls es obligatorio")
    private Long idImage;
    @NotBlank(message = "La URL de la imagen no puede estar vacía")
    @Size(max = 255, message = "La longitud máxima de la URL de la imagen es de 255 caracteres")
    private String imageUrl;
}
