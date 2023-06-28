package com.project.trs.dto;

import java.util.List;

public class AvailabilityResponse {
    private List<AvailabilityCourt> availabilityCourts;

    public AvailabilityResponse(List<AvailabilityCourt> availabilityCourts) {
        this.availabilityCourts = availabilityCourts;
    }

    public List<AvailabilityCourt> getAvailabilityCourts() {
        return availabilityCourts;
    }

    public void setAvailabilityCourts(List<AvailabilityCourt> availabilityCourts) {
        this.availabilityCourts = availabilityCourts;
    }
}
