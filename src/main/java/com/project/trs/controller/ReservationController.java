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

    @PostMapping("")
    public Reservation createReservation(@RequestBody ReservationRequest reservationRequest) {
        return reservationService.addReservation(reservationRequest);
    }


}
