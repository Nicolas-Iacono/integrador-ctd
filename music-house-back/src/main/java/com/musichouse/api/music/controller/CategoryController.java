package com.musichouse.api.music.controller;

import com.musichouse.api.music.dto.dto_entrance.CategoryDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.CategoryDtoExit;
import com.musichouse.api.music.dto.dto_modify.CategoryDtoModify;
import com.musichouse.api.music.exception.CategoryAssociatedException;
import com.musichouse.api.music.exception.ResourceNotFoundException;
import com.musichouse.api.music.service.CategoryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<CategoryDtoExit> createCategory(@RequestBody @Valid CategoryDtoEntrance categoryDtoEntrance) {
        CategoryDtoExit categoryDtoExit = categoryService.createCategory(categoryDtoEntrance);
        return new ResponseEntity<>(categoryDtoExit, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CategoryDtoExit>> allCategory() {
        List<CategoryDtoExit> categoryDtoExits = categoryService.getAllCategories();
        return new ResponseEntity<>(categoryDtoExits, HttpStatus.OK);
    }

    @GetMapping("/search/{idCategory}")
    public ResponseEntity<CategoryDtoExit> searchCategoryById(@PathVariable Long idCategory) throws ResourceNotFoundException {
        CategoryDtoExit categoryDtoExit = categoryService.getCategoryById(idCategory);
        return ResponseEntity.ok(categoryDtoExit);
    }

    @PutMapping("/update")
    public ResponseEntity<CategoryDtoExit> updateCategory(@RequestBody @Valid CategoryDtoModify categoryDtoModify) throws ResourceNotFoundException {
        CategoryDtoExit categoryDtoExit = categoryService.updateCategory(categoryDtoModify);
        return ResponseEntity.ok(categoryDtoExit);
    }

    @DeleteMapping("/delete/{idCategory}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long idCategory) {
        try {
            categoryService.deleteCategory(idCategory);
            return ResponseEntity.ok("Category deleted successfully");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
        } catch (CategoryAssociatedException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Cannot delete category as it is associated with instruments");
        }
    }
}