package com.musichouse.api.music.controller;

import com.musichouse.api.music.dto.dto_entrance.ImageUrlsDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.ImagesUrlsDtoExit;
import com.musichouse.api.music.dto.dto_modify.ImageUrlsDtoModify;
import com.musichouse.api.music.entity.ImageUrls;
import com.musichouse.api.music.exception.ResourceNotFoundException;
import com.musichouse.api.music.service.ImageUrlsService;
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

    private final ImageUrlsService imageUrlsService;

    @PostMapping("/addImage")
    public ResponseEntity<ImagesUrlsDtoExit> createImageUrls(@RequestBody @Valid ImageUrlsDtoEntrance imageUrlsDtoEntrance) throws ResourceNotFoundException {
        ImagesUrlsDtoExit imagesUrlsDtoExit = imageUrlsService.addImageUrls(imageUrlsDtoEntrance);
        return new ResponseEntity<>(imagesUrlsDtoExit, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ImagesUrlsDtoExit>> allImageUrls() {
        List<ImagesUrlsDtoExit> imagesUrlsDtoExits = imageUrlsService.getAllImageUrls();
        return new ResponseEntity<>(imagesUrlsDtoExits, HttpStatus.OK);
    }

    @GetMapping("/search/{idImage}")
    public ResponseEntity<ImagesUrlsDtoExit> searchImageUrlsById(@PathVariable Long idImage) throws ResourceNotFoundException {
        ImagesUrlsDtoExit imagesUrlsDtoExit = imageUrlsService.getImageUrlsById(idImage);
        return ResponseEntity.ok(imagesUrlsDtoExit);
    }

    @PutMapping("/update")
    public ResponseEntity<ImagesUrlsDtoExit> updateImageUrls(@RequestBody @Valid ImageUrlsDtoModify imageUrlsDtoModify) throws ResourceNotFoundException {
        ImagesUrlsDtoExit imagesUrlsDtoExit = imageUrlsService.updateImageUrls(imageUrlsDtoModify);
        return ResponseEntity.ok(imagesUrlsDtoExit);
    }

    @DeleteMapping("/delete/{idImage}")
    public ResponseEntity<?> deleteImageUrls(@PathVariable Long idImage) {
        try {
            imageUrlsService.deleteImageUrls(idImage);
            return ResponseEntity.ok("Image Urls force deleted successfully");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
