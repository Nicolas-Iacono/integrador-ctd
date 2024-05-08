package com.musichouse.api.music.repository;

import com.musichouse.api.music.entity.Instrument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstrumentRepository extends JpaRepository<Instrument,Long> {
}
