package com.musichouse.api.music.service;

import com.musichouse.api.music.dto.dto_entrance.ImageUrlsDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.ImagesUrlsDtoExit;
import com.musichouse.api.music.dto.dto_modify.ImageUrlsDtoModify;
import com.musichouse.api.music.entity.ImageUrls;
import com.musichouse.api.music.entity.Instruments;
import com.musichouse.api.music.exception.ResourceNotFoundException;
import com.musichouse.api.music.interfaces.ImageUrlsInterface;
import com.musichouse.api.music.repository.ImageUrlsRepository;
import com.musichouse.api.music.repository.InstrumentRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ImageUrlsService implements ImageUrlsInterface {
    private final static Logger LOGGER = LoggerFactory.getLogger(ImageUrlsService.class);
    private final ImageUrlsRepository imageUrlsRepository;
    private final ModelMapper mapper;
    private final InstrumentRepository instrumentRepository;

    @Override
    public ImagesUrlsDtoExit addImageUrls(ImageUrlsDtoEntrance imageUrlsDtoEntrance) throws ResourceNotFoundException {
        Instruments instrument = instrumentRepository.findById(imageUrlsDtoEntrance.getIdInstrument())
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró el instrumento con el ID proporcionado"));
        ImageUrls image = new ImageUrls();
        image.setImageUrl(imageUrlsDtoEntrance.getImageUrl());
        image.setInstrument(instrument);
        instrument.getImageUrls().add(image);
        instrumentRepository.save(instrument);

        // Realizar el mapeo de ImageUrls a ImagesUrlsDtoExit
        return mapper.map(image, ImagesUrlsDtoExit.class);
    }


    @Override
    public List<ImagesUrlsDtoExit> getAllImageUrls() {
        List<ImagesUrlsDtoExit> imagesUrlsDtoExits = imageUrlsRepository.findAll().stream()
                .map(imageUrls -> mapper.map(imageUrls, ImagesUrlsDtoExit.class)).toList();
        return imagesUrlsDtoExits;
    }

    @Override
    public ImagesUrlsDtoExit getImageUrlsById(Long idImage) throws ResourceNotFoundException {
        ImageUrls imageUrls = imageUrlsRepository.findById(idImage).orElse(null);
        ImagesUrlsDtoExit imagesUrlsDtoExit = null;
        if (imageUrls != null) {
            imagesUrlsDtoExit = mapper.map(imageUrls, ImagesUrlsDtoExit.class);
        } else {
            throw new ResourceNotFoundException("Imagen no encontrada con ID " + idImage);
        }

        return imagesUrlsDtoExit;
    }

    @Override
    public ImagesUrlsDtoExit updateImageUrls(ImageUrlsDtoModify imageUrlsDtoModify) throws ResourceNotFoundException {
        ImageUrls imageUrlsToUpdate = imageUrlsRepository.findById(imageUrlsDtoModify.getIdImage())
                .orElseThrow(() -> new ResourceNotFoundException("Imagen no encontrada con ID " + imageUrlsDtoModify.getIdImage()));
        imageUrlsToUpdate.setImageUrl(imageUrlsDtoModify.getImageUrl());
        imageUrlsRepository.save(imageUrlsToUpdate);
        return mapper.map(imageUrlsToUpdate, ImagesUrlsDtoExit.class);
    }

    @Override
    public void deleteImageUrls(Long idImage) throws ResourceNotFoundException {
        LOGGER.info("Intentando eliminar la imagen con ID: {}", idImage);

        // Buscar la imagen por su ID
        ImageUrls imageUrlsToDelete = imageUrlsRepository.findById(idImage)
                .orElseThrow(() -> new ResourceNotFoundException("Imagen no encontrada con ID " + idImage));

        LOGGER.info("Imagen encontrada para eliminación: {}", imageUrlsToDelete);

        // Obtener el instrumento asociado a la imagen
        Instruments instrument = imageUrlsToDelete.getInstrument();

        // Remover la imagen del instrumento
        if (instrument != null) {
            instrument.getImageUrls().remove(imageUrlsToDelete);
            instrumentRepository.save(instrument);
        }

        // Eliminar la imagen
        imageUrlsRepository.delete(imageUrlsToDelete);

        LOGGER.info("Imagen eliminada correctamente");
    }
}
