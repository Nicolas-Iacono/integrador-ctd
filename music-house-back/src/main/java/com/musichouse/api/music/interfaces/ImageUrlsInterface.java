package com.musichouse.api.music.interfaces;


import com.musichouse.api.music.dto.dto_entrance.ImageUrlsDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.ImagesUrlsDtoExit;
import com.musichouse.api.music.dto.dto_modify.ImageUrlsDtoModify;

import java.util.List;

public interface ImageUrlsInterface {
    ImagesUrlsDtoExit createImageUrls(ImageUrlsDtoEntrance imageUrlsDtoEntrance);

    List<ImagesUrlsDtoExit> getAllImageUrls();

    ImagesUrlsDtoExit getImageUrlsById(Long idImage);

    ImagesUrlsDtoExit updateImageUrls(ImageUrlsDtoModify imageUrlsDtoModify);

    void deleteImageUrls(Long idImage);

}
