package com.musichouse.api.music.service;

import com.musichouse.api.music.dto.dto_entrance.CategoryDtoEntrance;
import com.musichouse.api.music.dto.dto_exit.CategoryDtoExit;
import com.musichouse.api.music.dto.dto_modify.CategoryDtoModify;
import com.musichouse.api.music.entity.Category;
import com.musichouse.api.music.interfaces.CategoryInterface;
import com.musichouse.api.music.repository.CategoryRepository;
import com.musichouse.api.music.util.JsonPrinter;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService implements CategoryInterface {
    private static final Logger LOGGER = LoggerFactory.getLogger(CategoryService.class);
    private final CategoryRepository categoryRepository;
    private final ModelMapper mapper;

    @Override
    public CategoryDtoExit createCategory(CategoryDtoEntrance categoryDtoEntrance) {
        LOGGER.info("createCategory" + JsonPrinter.toString(categoryDtoEntrance));
        Category category = mapper.map(categoryDtoEntrance, Category.class);
        Category categorySaved = categoryRepository.save(category);
        CategoryDtoExit categoryDtoExit = mapper.map(categorySaved, CategoryDtoExit.class);
        LOGGER.info("createCategory" + JsonPrinter.toString(categoryDtoExit));
        return categoryDtoExit;
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
