package com.project.trs.service;

import com.project.trs.dto.ReservationRequest;
import com.project.trs.model.reservation.Reservation;

import java.util.List;

public interface ReservationService {
    public List<Reservation> getAllReservation();
    public Reservation getReservationById(int id);
    public List<Reservation> getReservationsByUserId(int id);
    public Reservation addReservation(ReservationRequest reservationRequest);
}
