package com.musichouse.api.music.controller;

import com.musichouse.api.music.dto.dto_entrance.ImageUrlsDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.ImagesUrlsDtoExit;
import com.musichouse.api.music.dto.dto_modify.ImageUrlsDtoModify;
import com.musichouse.api.music.interfaces.ImageUrlsInterface;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/imageurls")
public class ImageUrlsController {

    private final ImageUrlsInterface imageUrlsInterface;

    @PostMapping("/create")
    public ResponseEntity<ImagesUrlsDtoExit> createImageUrls(@RequestBody @Valid ImageUrlsDtoEntrance imageUrlsDtoEntrance) {
        ImagesUrlsDtoExit imagesUrlsDtoExit = imageUrlsInterface.createImageUrls(imageUrlsDtoEntrance);
        return new ResponseEntity<>(imagesUrlsDtoExit, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ImagesUrlsDtoExit>> allImageUrls() {
        List<ImagesUrlsDtoExit> imagesUrlsDtoExits = imageUrlsInterface.getAllImageUrls();
        return new ResponseEntity<>(imagesUrlsDtoExits, HttpStatus.OK);
    }

    @GetMapping("/search/{idImage}")
    public ResponseEntity<ImagesUrlsDtoExit> searchImageUrlsById(@PathVariable Long idImage) {
        ImagesUrlsDtoExit imagesUrlsDtoExit = imageUrlsInterface.getImageUrlsById(idImage);
        return ResponseEntity.ok(imagesUrlsDtoExit);
    }

    @PutMapping("/update")
    public ResponseEntity<ImagesUrlsDtoExit> updateImageUrls(@RequestBody @Valid ImageUrlsDtoModify imageUrlsDtoModify) {
        ImagesUrlsDtoExit imagesUrlsDtoExit = imageUrlsInterface.updateImageUrls(imageUrlsDtoModify);
        return ResponseEntity.ok(imagesUrlsDtoExit);
    }

    @DeleteMapping("/delete/{idCategory}")
    public ResponseEntity<String> deleteImageUrls(@PathVariable Long idImage) {
        imageUrlsInterface.deleteImageUrls(idImage);
        return ResponseEntity.ok("Image Urls deleted successfully");
    }
}
