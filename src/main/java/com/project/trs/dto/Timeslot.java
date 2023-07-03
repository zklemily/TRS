package com.project.trs.dto;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Objects;

public class Timeslot {
    private Timestamp startTime;
    private Timestamp endTime;
    private boolean available;
    private int count;

    public Timeslot() {
    }

    public Timeslot(Timestamp startTime, Timestamp endTime, boolean available) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.available = available;
        this.count = 1;
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

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || this.getClass() != obj.getClass()) {
            return false;
        }
        Timeslot second = (Timeslot) obj;
        return this.startTime.compareTo(second.getStartTime()) == 0  && this.endTime.compareTo(second.getEndTime()) == 0;
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + (startTime != null ? startTime.hashCode() : 0);
        result = 31 * result + (endTime != null ? endTime.hashCode() : 0);
        return result;
    }


//    @Override
//    public int hashCode() {
//        return Objects.hash(startTime, endTime);
//    }

}
