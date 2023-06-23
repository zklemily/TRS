package com.project.trs.model.reservation;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "reservation_status")
public class ReservationStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "resStatus")
    private List<Reservation> reservations;

    private String status;
}
