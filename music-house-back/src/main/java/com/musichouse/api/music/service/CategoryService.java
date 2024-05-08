package com.musichouse.api.music.service;

import com.musichouse.api.music.dto.dto_entrance.CategoryDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.CategoryDtoExit;
import com.musichouse.api.music.dto.dto_modify.CategoryDtoModify;
import com.musichouse.api.music.interfaces.CategoryInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements CategoryInterface {
    @Override
    public CategoryDtoExit createCategory(CategoryDtoEntrance categoryDtoEntrance) {
        return null;
    }

    @Override
    public List<CategoryDtoExit> getAllCategories() {
        return List.of();
    }

    @Override
    public CategoryDtoExit getCategoryById(Long idCategory) {
        return null;
    }

    @Override
    public CategoryDtoExit updateCategory(CategoryDtoModify categoryDtoModify) {
        return null;
    }

    @Override
    public void deleteCategory(Long idCategory) {

    }
}
