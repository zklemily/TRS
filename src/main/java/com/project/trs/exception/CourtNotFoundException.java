package com.project.trs.exception;

public class CourtNotFoundException extends RuntimeException{
    public CourtNotFoundException(int id) {
        super("Could not find the court with id " + id);
    }
}
