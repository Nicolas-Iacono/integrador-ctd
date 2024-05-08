package com.musichouse.api.music.interfaces;

import com.musichouse.api.music.dto.dto_entrance.InstrumentDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.InstrumentDtoExit;
import com.musichouse.api.music.dto.dto_modify.InstrumentDtoModify;

import java.util.List;

public interface InstrumentInterface {
    InstrumentDtoExit createInstrument(InstrumentDtoEntrance instrumentsDtoEntrance);

    List<InstrumentDtoExit> getAllInstruments();

    InstrumentDtoExit getInstrumentById(Long dInstrument);

    InstrumentDtoExit updateInstrument(InstrumentDtoModify instrumentDtoModify);

    void deleteInstrument(Long dInstrument);
}
