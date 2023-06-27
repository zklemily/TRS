package com.project.trs.exception;

import java.sql.Timestamp;

public class AvailabilityException extends RuntimeException{
    public AvailabilityException(Timestamp start, Timestamp end) {
        super("There are no available courts between " + start + " and " + end);
    }
}
