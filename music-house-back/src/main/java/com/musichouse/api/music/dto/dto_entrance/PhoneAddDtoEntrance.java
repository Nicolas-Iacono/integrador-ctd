package com.musichouse.api.music.dto.dto_entrance;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhoneAddDtoEntrance {

    @NotNull(message = "El id del user es obligatorio")
    private Long idUser;

    @Pattern(regexp = "^\\+?[0-9]+([-]?[0-9]+)*$", message = "El número de teléfono debe tener un formato válido")
    @NotNull(message = "El número de teléfono es obligatorio")
    private String phoneNumber;
}
