package com.project.trs.model.court;

import com.project.trs.model.user.UserType;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "court")
public class Court {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "court_type_id")
    private CourtType courtType;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public CourtType getCourtType() {
        return courtType;
    }

    public void setCourtType(CourtType courtType) {
        this.courtType = courtType;
    }
}
