package com.musichouse.api.music.repository;

import com.musichouse.api.music.entity.ImageUrls;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageUrlsRepository extends JpaRepository<ImageUrls, Long> {


}
