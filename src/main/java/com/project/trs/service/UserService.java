package com.project.trs.service;

import com.project.trs.model.user.User;

import java.util.List;

public interface UserService {
    public User registerUser(User user);

    public List<User> getAllUsers();

    public User getUserById(int id);
}
