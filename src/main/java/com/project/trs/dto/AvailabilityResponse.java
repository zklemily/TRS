package com.project.trs.dto;

import com.project.trs.model.court.Court;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class AvailabilityResponse {
    // {courId: {day: {times}}}
    private Map<Integer, Map<LocalDate, List<Timeslot>>> courtAvailabilityMap;

    public AvailabilityResponse(Map<Integer, Map<LocalDate, List<Timeslot>>> courtAvailabilityMap) {
        this.courtAvailabilityMap = courtAvailabilityMap;
    }

    public Map<Integer, Map<LocalDate, List<Timeslot>>> getCourtAvailabilityMap() {
        return courtAvailabilityMap;
    }

    public void setCourtAvailabilityMap(Map<Integer, Map<LocalDate, List<Timeslot>>> courtAvailabilityMap) {
        this.courtAvailabilityMap = courtAvailabilityMap;
    }


}
