package com.project.trs.exception;

public class GuestConflictException extends RuntimeException{
    public  GuestConflictException(String name) {
        super(name + "already has an existing reservation during this time.");
    }
}
