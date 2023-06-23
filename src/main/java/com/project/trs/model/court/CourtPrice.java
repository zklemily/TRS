package com.project.trs.model.court;

import com.project.trs.model.user.UserType;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "courtPrice")
public class CourtPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "court_type_id")
    private CourtType courtType;

    @ManyToOne
    @JoinColumn(name = "user_type_id")
    private UserType userType;

    private BigDecimal price;
}
