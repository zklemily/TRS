package com.project.trs.controller;

import com.project.trs.model.reservation.Reservation;
import com.project.trs.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservations")
@CrossOrigin
public class ReservationController {
    @Autowired
    ReservationService reservationService;

    @PostMapping("")
    public ResponseEntity<String> createReservation(@RequestBody Reservation reservation) {
        reservationService.addReservation(reservation);
        return ResponseEntity.ok("Reservation is created");
    }


}
