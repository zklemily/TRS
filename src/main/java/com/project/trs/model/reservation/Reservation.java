package com.project.trs.model.reservation;

import com.project.trs.model.court.Court;
import com.project.trs.model.user.User;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "guest_user_id")
    private User guest;
    @ManyToOne
    @JoinColumn(name = "court_id")
    private Court court;
    @ManyToOne
    @JoinColumn(name = "res_status_id")
    private ReservationStatus resStatus;

    private int original_res_id;
    private int version;
    private Timestamp startTime;
    private Timestamp endTime;
    private BigDecimal price;
    private Timestamp createdAt;
    private Timestamp updatedAt;


}
