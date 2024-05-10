package com.musichouse.api.music.controller;

import com.musichouse.api.music.dto.dto_entrance.ImageUrlsDtoEntrance;
import com.musichouse.api.music.dto.dto_entrance.InstrumentDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.InstrumentDtoExit;
import com.musichouse.api.music.dto.dto_modify.InstrumentDtoModify;
import com.musichouse.api.music.exception.ResourceNotFoundException;
import com.musichouse.api.music.service.InstrumentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/instrument")
public class InstrumentController {

    private final InstrumentService instrumentService;

    @PostMapping("/create")
    public ResponseEntity<InstrumentDtoExit> createInstrument(@Valid @RequestBody InstrumentDtoEntrance instrumentsDtoEntrance) throws ResourceNotFoundException {
        InstrumentDtoExit createdInstrument = instrumentService.createInstrument(instrumentsDtoEntrance);
        return new ResponseEntity<>(createdInstrument, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<InstrumentDtoExit>> allInstruments() {
        List<InstrumentDtoExit> allInstruments = instrumentService.getAllInstruments();
        return new ResponseEntity<>(allInstruments, HttpStatus.OK);
    }

    @GetMapping("/search/{idInstrument}")
    public ResponseEntity<InstrumentDtoExit> searchInstrumentById(@PathVariable Long idInstrument) throws ResourceNotFoundException {
        InstrumentDtoExit foundInstrument = instrumentService.getInstrumentById(idInstrument);
        return new ResponseEntity<>(foundInstrument, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<InstrumentDtoExit> updateInstrument(@Valid @RequestBody InstrumentDtoModify instrumentDtoModify) throws ResourceNotFoundException {
        InstrumentDtoExit updatedInstrument = instrumentService.updateInstrument(instrumentDtoModify);
        return new ResponseEntity<>(updatedInstrument, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{idInstrument}")
    public ResponseEntity<String> deleteInstrument(@PathVariable Long idInstrument) throws ResourceNotFoundException {
        instrumentService.deleteInstrument(idInstrument);
        return new ResponseEntity<>("Instrument deleted successfully", HttpStatus.OK);
    }

}
