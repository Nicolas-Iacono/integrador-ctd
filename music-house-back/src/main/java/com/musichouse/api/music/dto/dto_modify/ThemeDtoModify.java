package com.musichouse.api.music.dto.dto_modify;

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
public class ThemeDtoModify {
    @NotNull(message = "El id de la tematica es obligatorio")
    private Long idTheme;
    @NotBlank(message = "El nombre de la tematica es obligatorio")
    @Size(max = 100, message = "El nombre de la tematica debe tener como máximo {max} caracteres")
    private String themeName;
    @Size(max = 255, message = "La descripción de la tematica debe tener como máximo {max} caracteres")
    private String description;
}
