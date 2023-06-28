package com.project.trs.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(int id) {
        super("Could not find the user with id " + id);
    }

    public UserNotFoundException(String email) {
        super("Could not find the user with email " + email);
    }
}
