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
    @Query(value = "SELECT * FROM reservation r WHERE r.res_status_id = 1 AND r.start_time <= :endTime AND r.end_time >= :startTime", nativeQuery = true)
    List<Reservation> timeConflictingReservations(@Param("startTime") Timestamp startTime, @Param("endTime") Timestamp endTime);

}
