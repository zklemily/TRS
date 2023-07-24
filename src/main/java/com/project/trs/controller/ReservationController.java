package com.project.trs.controller;

import com.project.trs.dto.ReservationRequest;
import com.project.trs.model.reservation.Reservation;
import com.project.trs.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@CrossOrigin
public class ReservationController {
    @Autowired
    ReservationService reservationService;

    @GetMapping("")
    public List<Reservation> getAllReservation() {
        return reservationService.getAllReservation();
    }

    @GetMapping("/{reservation-id}")
    public Reservation getReservationById(@PathVariable("reservation-id") int reservationId) {
        return reservationService.getReservationById(reservationId);
    }

    @GetMapping("/user/{user-id}")
    public List<Reservation> getReservationsByUserId(@PathVariable("user-id") int userId) {
        return reservationService.getReservationsByUserId(userId);
    }

    @PostMapping("")
    public Reservation createReservation(@RequestBody ReservationRequest reservationRequest) {
        return reservationService.addReservation(reservationRequest);
    }
}
