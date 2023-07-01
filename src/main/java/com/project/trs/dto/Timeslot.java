package com.project.trs.dto;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.HashMap;

public class Timeslot {
    private Timestamp startTime;
    private Timestamp endTime;
    private boolean available;

    public Timeslot() {
    }

    public Timeslot(Timestamp startTime, Timestamp endTime, boolean available) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.available = available;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    @Override
    public boolean equals(Object obj) {
        if (this.getClass() != obj.getClass()) {
            return false;
        }
        Timeslot second = (Timeslot) obj;
        return this.startTime == second.getStartTime() && this.endTime == second.getEndTime();
    }
}
