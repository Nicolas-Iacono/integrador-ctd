package com.musichouse.api.music.repository;

import com.musichouse.api.music.entity.Instruments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstrumentRepository extends JpaRepository<Instruments, Long> {
}
