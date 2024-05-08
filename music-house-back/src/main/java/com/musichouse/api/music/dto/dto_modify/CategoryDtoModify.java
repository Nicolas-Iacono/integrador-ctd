package com.musichouse.api.music.dto.dto_modify;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CategoryDtoModify {

    @NotNull(message = "El id de la categoría es obligatorio")
    private Long idCategory;
    @NotBlank(message = "El nombre de la categoría es obligatorio")
    @Size(max = 100, message = "El nombre de la categoría debe tener como máximo {max} caracteres")
    private String name;
    @Size(max = 255, message = "La descripción de la categoría debe tener como máximo {max} caracteres")
    private String description;
}
