package com.project.trs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.trs.model.court.CourtType;
import org.springframework.stereotype.Repository;

@Repository
public interface CourtTypeRepository extends JpaRepository<CourtType, Integer> {
    CourtType findByType(String type);
}
