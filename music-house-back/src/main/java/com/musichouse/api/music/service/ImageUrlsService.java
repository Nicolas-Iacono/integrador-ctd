package com.musichouse.api.music.service;

import com.musichouse.api.music.dto.dto_entrance.ImageUrlsDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.ImagesUrlsDtoExit;
import com.musichouse.api.music.dto.dto_modify.ImageUrlsDtoModify;
import com.musichouse.api.music.entity.ImageUrls;
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
    public ImagesUrlsDtoExit createImageUrls(ImageUrlsDtoEntrance imageUrlsDtoEntrance) {
        ImageUrls imageUrls = mapper.map(imageUrlsDtoEntrance, ImageUrls.class);
        ImageUrls imageUrlsSave = imageUrlsRepository.save(imageUrls);
        ImagesUrlsDtoExit imagesUrlsDtoExit = mapper.map(imageUrlsSave, ImagesUrlsDtoExit.class);
        return imagesUrlsDtoExit;
    }

    @Override
    public List<ImagesUrlsDtoExit> getAllImageUrls() {
        return List.of();
    }

    @Override
    public ImagesUrlsDtoExit getImageUrlsById(Long idImage) {
        return null;
    }

    @Override
    public ImagesUrlsDtoExit updateImageUrls(ImageUrlsDtoModify imageUrlsDtoModify) {
        return null;
    }

    @Override
    public void deleteImageUrls(Long idImage) {

    }
}
