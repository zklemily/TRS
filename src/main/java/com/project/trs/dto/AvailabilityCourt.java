package com.project.trs.dto;

import com.project.trs.model.court.Court;

import java.util.List;

public class AvailabilityCourt {
    private Court court;
    private List<AvailabilityDay> availabilityDays;

    public AvailabilityCourt(List<AvailabilityDay> availabilityDays) {
        this.availabilityDays = availabilityDays;
    }

    public List<AvailabilityDay> getAvailabilityDays() {
        return availabilityDays;
    }

    public void setAvailabilityDays(List<AvailabilityDay> availabilityDays) {
        this.availabilityDays = availabilityDays;
    }
}
