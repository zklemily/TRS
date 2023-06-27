package com.project.trs.exception;

public class CourtTypeException extends RuntimeException{
    public CourtTypeException(String type) {
        super("There are no " + type + " courts available during the given time.");
    }
}
