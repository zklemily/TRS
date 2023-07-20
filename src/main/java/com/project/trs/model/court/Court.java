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
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "court_type_id")
    private CourtType courtType;

    private String displayName;

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

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
