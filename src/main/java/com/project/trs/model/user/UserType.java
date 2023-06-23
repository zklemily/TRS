package com.project.trs.model.user;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "userType")
public class UserType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String type;

    @OneToMany(mappedBy = "userType")
    private List<User> users;
}
