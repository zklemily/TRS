package com.project.trs.service;

import com.project.trs.model.reservation.Reservation;
import com.project.trs.repository.CourtRepository;
import com.project.trs.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class ReservationServiceHelper {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private CourtRepository courtRepository;

    public boolean hasTimeConflict(Timestamp start, Timestamp end) {
        List<Reservation> conflictReservations = reservationRepository.timeConflictingReservations(start, end);
        return conflictReservations.size() == courtRepository.count();
    }
}
