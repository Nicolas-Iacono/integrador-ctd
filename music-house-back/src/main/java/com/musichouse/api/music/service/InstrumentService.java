package com.musichouse.api.music.service;

import com.musichouse.api.music.dto.dto_entrance.InstrumentDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.InstrumentDtoExit;
import com.musichouse.api.music.dto.dto_modify.InstrumentDtoModify;
import com.musichouse.api.music.interfaces.InstrumentInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentService implements InstrumentInterface {
    @Override
    public InstrumentDtoExit createInstrument(InstrumentDtoEntrance instrumentsDtoEntrance) {
        return null;
    }

    @Override
    public List<InstrumentDtoExit> getAllInstruments() {
        return List.of();
    }

    @Override
    public InstrumentDtoExit getInstrumentById(Long dInstrument) {
        return null;
    }

    @Override
    public InstrumentDtoExit updateInstrument(InstrumentDtoModify instrumentDtoModify) {
        return null;
    }

    @Override
    public void deleteInstrument(Long dInstrument) {

    }
}
