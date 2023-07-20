package com.project.trs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.trs.model.court.CourtType;

public interface CourtTypeRepository extends JpaRepository<CourtType, Integer> {
    CourtType findByType(String type);
}
