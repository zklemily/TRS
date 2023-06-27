package com.project.trs.exception;

public class CourtException extends RuntimeException {
    public CourtException(int courtId) {
        super("Court " + courtId + " is not available during the given time.");
    }
}
