package com.project.trs.repository;

import com.project.trs.model.reservation.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResStatusRepository extends JpaRepository<ReservationStatus, Integer> {
    ReservationStatus findByStatus(String status);
}
