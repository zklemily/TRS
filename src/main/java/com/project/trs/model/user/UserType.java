package com.project.trs.model.user;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "userType")
public class UserType {
    public UserType() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String type;

    @OneToMany(mappedBy = "userType")
    private List<User> users;

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
