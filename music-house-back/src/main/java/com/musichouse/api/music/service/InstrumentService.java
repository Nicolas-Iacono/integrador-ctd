package com.musichouse.api.music.service;

import com.musichouse.api.music.dto.dto_entrance.InstrumentDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.InstrumentDtoExit;
import com.musichouse.api.music.dto.dto_modify.InstrumentDtoModify;
import com.musichouse.api.music.entity.Category;
import com.musichouse.api.music.entity.Instrument;
import com.musichouse.api.music.interfaces.InstrumentInterface;
import com.musichouse.api.music.repository.CategoryRepository;
import com.musichouse.api.music.repository.InstrumentRepository;
import com.musichouse.api.music.util.JsonPrinter;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InstrumentService implements InstrumentInterface {
    private static final Logger LOGGER = LoggerFactory.getLogger(InstrumentService.class);
    private final InstrumentRepository instrumentRepository;
    private final ModelMapper mapper;
    private final CategoryRepository categoryRepository;

    @Override
    public InstrumentDtoExit createInstrument(InstrumentDtoEntrance instrumentsDtoEntrance) {
        LOGGER.info("createInstrument " + JsonPrinter.toString(instrumentsDtoEntrance));

        // Verifica que el ID de la categoría no sea nulo
        if (instrumentsDtoEntrance.getIdCategory() == null) {
            throw new IllegalArgumentException("ID de categoría no puede ser nulo");
        }

        // Obtiene la categoría desde la base de datos utilizando su ID
        Category category = categoryRepository.findById(instrumentsDtoEntrance.getIdCategory())
                .orElseThrow(() -> new IllegalArgumentException("No se encontró la categoría con el ID proporcionado"));

        Instrument instrument = mapper.map(instrumentsDtoEntrance, Instrument.class);
        instrument.setCategory(category);

        Instrument instrumentSave = instrumentRepository.save(instrument);
        InstrumentDtoExit instrumentDtoExit = mapper.map(instrumentSave, InstrumentDtoExit.class);
        LOGGER.info("createInstrument " + JsonPrinter.toString(instrumentDtoExit));
        return instrumentDtoExit;
    }

    @Override
    public List<InstrumentDtoExit> getAllInstruments() {
        return List.of();
    }

    @Override
    public InstrumentDtoExit getInstrumentById(Long idInstrument) {
        return null;
    }

    @Override
    public InstrumentDtoExit updateInstrument(InstrumentDtoModify instrumentDtoModify) {
        return null;
    }

    @Override
    public void deleteInstrument(Long idInstrument) {

    }
}
