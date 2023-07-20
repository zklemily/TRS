package com.project.trs.repository;

import com.project.trs.model.court.Court;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface CourtRepository extends JpaRepository<Court, Integer> {
    long count();

    // return all courts with type = typeId
    List<Court> findByCourtTypeId(int typeId);

    @Query(value = "SELECT COUNT(*) FROM court c WHERE c.courtTypeId = :typeId", nativeQuery = true)
    long countCourtsByCourtTypeId(@Param("typeId") int typeId);

    @Query(value = "SELECT * FROM court c WHERE c.courtTypeId = :typeId AND NOT EXISTS " +
            "(SELECT r FROM rReservation r WHERE r.court = c " +
            "AND r.start_time < :endTime AND r.end_time > :startTime)", nativeQuery = true)
    List<Court> findAvailableCourtsByType(@Param("typeId") int typeId, @Param("startTime") Timestamp startTime,
                                               @Param("endTime") Timestamp endTime);

    @Query(value = "SELECT COUNT(*) FROM reservation WHERE court_id = :courtId AND start_time < :endTime" +
            " AND end_time > :startTime AND res_status_id = 1", nativeQuery = true)
    long courtReserved(@Param("courtId") int courtId,  @Param("startTime") Timestamp startTime,
                             @Param("endTime") Timestamp endTime);

    @Query(value = "SELECT * FROM court WHERE id NOT IN " +
            "(SELECT court_id FROM reservation WHERE start_time < :endTime AND end_time > :startTime " +
            "AND res_status_id = 1)", nativeQuery = true)
    List<Court> findAvailableCourts(@Param("startTime") Timestamp startTime, @Param("endTime") Timestamp endTime);
}
