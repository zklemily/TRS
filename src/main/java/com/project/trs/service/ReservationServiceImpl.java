package com.project.trs.service;

import com.project.trs.exception.AvailabilityException;
import com.project.trs.exception.CourtException;
import com.project.trs.exception.CourtTypeException;
import com.project.trs.model.court.Court;
import com.project.trs.model.court.CourtType;
import com.project.trs.model.reservation.Reservation;
import com.project.trs.repository.CourtRepository;
import com.project.trs.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Random;

@Service
public class ReservationServiceImpl implements ReservationService {
    @Autowired
    private ReservationServiceHelper reservationServiceHelper;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private CourtRepository courtRepository;

    @Override
    public Reservation addReservation(Reservation reservation) {
        Timestamp start = reservation.getStartTime();
        Timestamp end = reservation.getEndTime();
        // check if there are any available courts during the time
        if (reservationServiceHelper.hasTimeConflict(start, end)) {
            throw new AvailabilityException(start, end);
        }

        List<Reservation> conflictReservations = reservationRepository.timeConflictingReservations(start, end);

        // if there is a specific court ID, check if it's available
        Court court = reservation.getCourt();
        if (court != null) {
            for (Reservation r : conflictReservations) {
                if (r.getCourt().getId() == court.getId()) {
                    throw new CourtException(court.getId());
                }
            }
            reservation.setCourtType(court.getCourtType());
        }

        // if there is a specific court type, check if it's available;
        CourtType courtType = reservation.getCourtType();
        if (courtType != null) {
            long count = 0;
            for (Reservation r : conflictReservations) {
                if (r.getCourtType().getId() == courtType.getId()) {
                    count += 1;
                }
            }
            if (count == courtRepository.countCourtsByCourtTypeId(courtType.getId())) {
                throw new CourtTypeException(courtType.getType());
            }
            List<Court> availableCourts = courtRepository.findAvailableCourtsByType(courtType.getId(), start, end);
            int randomIndex = new Random().nextInt(availableCourts.size());
            Court selectedCourt = availableCourts.get(randomIndex);
            reservation.setCourt(selectedCourt);
        }


        return reservationRepository.save(reservation);
    }
}
