package com.project.trs.repository;

import com.project.trs.model.reservation.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    @Query("SELECT r FROM Reservation r WHERE r.status = 'reserved' AND r.startTime <= :endTime" +
            "AND r.endTime >= :startTime")
    List<Reservation> timeConflictingReservations(@Param("startTime") Timestamp startTime, @Param("endTime") Timestamp endTime);

}
