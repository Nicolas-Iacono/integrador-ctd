package com.musichouse.api.music.interfaces;

import com.musichouse.api.music.dto.dto_entrance.CategoryDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.CategoryDtoExit;

import java.util.List;

public interface CategoryInterface {
    CategoryDtoExit createCategory(CategoryDtoEntrance categoryDtoEntrance);

    List<CategoryDtoExit> getAllCategories();

    CategoryDtoExit getCategoryById(Long idCategory);

    CategoryDtoExit updateCategory(CategoryDtoEntrance categoryDtoEntrance);

    void deleteCategory(Long idCategory);

}
