package com.project.trs.dto;

import java.util.Date;
import java.util.List;

public class AvailabilityDay {
    private Date date;
    private List<Timeslot> timeslots;

    public AvailabilityDay(Date date, List<Timeslot> timeslots) {
        this.date = date;
        this.timeslots = timeslots;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<Timeslot> getTimeslots() {
        return timeslots;
    }

    public void setTimeslots(List<Timeslot> timeslots) {
        this.timeslots = timeslots;
    }
}
