package com.project.trs.model.court;

import com.project.trs.model.reservation.Reservation;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "courtType")
public class CourtType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String type;

    @OneToMany(mappedBy = "courtType")
    private List<Court> courts;

    @OneToMany(mappedBy = "courtType")
    private List<CourtPrice> prices;

    @OneToMany(mappedBy = "courtType")
    private List<Reservation> reservations;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
