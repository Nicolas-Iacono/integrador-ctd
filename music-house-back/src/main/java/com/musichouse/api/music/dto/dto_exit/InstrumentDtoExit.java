package com.musichouse.api.music.dto.dto_exit;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstrumentDtoExit {
    private Long idInstrument;
    private String name;
    private String description;
    private BigDecimal rentalPrice;
    private String imageUrl;
}
