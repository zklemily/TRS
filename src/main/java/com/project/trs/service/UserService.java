package com.project.trs.service;

import com.project.trs.model.user.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);

    public User registerUser(User user);

    public List<User> getAllUsers();

    public User getUserById(int id);

    public User getUserByEmail(String email);

    public User authenticateUser(String username, String password);

    public User getUserByUsername(String username);

    public int activateUser(String email, String token);

    public User setPassword(String email, String newPassword);

    public User forgotPassword(String email);
}
