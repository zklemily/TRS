package com.project.trs.service;

import com.project.trs.dto.ReservationRequest;
import com.project.trs.exception.AvailabilityException;
import com.project.trs.exception.CourtException;
import com.project.trs.exception.CourtTypeException;
import com.project.trs.exception.GuestConflictException;
import com.project.trs.model.court.Court;
import com.project.trs.model.court.CourtType;
import com.project.trs.model.reservation.Reservation;
import com.project.trs.model.user.User;
import com.project.trs.repository.CourtRepository;
import com.project.trs.repository.ResStatusRepository;
import com.project.trs.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class ReservationServiceImpl implements ReservationService {
    @Autowired
    private UserService userService;
    @Autowired
    private ReservationServiceHelper reservationServiceHelper;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private CourtService courtService;
    @Autowired
    private CourtRepository courtRepository;
    @Autowired
    private CourtTypeService courtTypeService;
    @Autowired
    private ResStatusRepository resStatusRepository;

    @Override
    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation addReservation(ReservationRequest reservationRequest) {

        Reservation reservation = new Reservation();

        Timestamp start = reservationRequest.getStartTime();
        Timestamp end = reservationRequest.getEndTime();

        User user = userService.getUserById(reservationRequest.getUserId());
        User guest = userService.getUserById(reservationRequest.getGuestId());

        // check if guest user has existing reservation during the time
        if (reservationServiceHelper.hasExistingRes(guest.getId(), start, end)) {
            throw new GuestConflictException(guest.getFirstName());
        }

        reservation.setUser(user);
        reservation.setGuest(guest);

        // check if there are any available courts during the time
        if (reservationServiceHelper.hasTimeConflict(start, end)) {
            throw new AvailabilityException(start, end);
        }

        List<Reservation> conflictReservations = reservationRepository.timeConflictingReservations(start, end);

        // if there is a specific court ID, check if it's available
        if (reservationRequest.getCourtId() != 0) {
            Court court = courtService.getCourtById(reservationRequest.getCourtId());
            for (Reservation r : conflictReservations) {
                if (r.getCourt().getId() == court.getId()) {
                    throw new CourtException(court.getId());
                }
            }
            reservation.setCourt(court);
            reservation.setCourtType(court.getCourtType());
        }

        // if there is a specific court type but no specific court, check if it's available;
        if (reservationRequest.getCourtTypeId() != 0 && reservationRequest.getCourtId() == 0) {
            CourtType courtType = courtTypeService.getCourtTypeById(reservationRequest.getCourtTypeId());
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
            reservation.setCourtType(courtType);
        }

        // if there is no specified court or court id, select a random available court
        if (reservationRequest.getCourtId() == 0 && reservationRequest.getCourtTypeId() == 0) {
            List<Court> allAvailableCourts = courtService.getAvailableCourts(start, end);
            int randomIndex = new Random().nextInt(allAvailableCourts.size());
            Court selectedCourt = allAvailableCourts.get(randomIndex);
            reservation.setCourt(selectedCourt);
            reservation.setCourtType(selectedCourt.getCourtType());
        }

        reservation.setStartTime(start);
        reservation.setEndTime(end);
        reservation.setPrice(reservationRequest.getPrice());
        reservation.setResStatus(resStatusRepository.findByStatus("reserved"));
        reservation.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        reservation.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));

        return reservationRepository.save(reservation);
    }
}
