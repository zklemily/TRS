package com.project.trs.model.court;

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
}
