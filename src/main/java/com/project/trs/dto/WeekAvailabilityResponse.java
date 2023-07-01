package com.project.trs.dto;

import java.time.LocalDate;
import java.util.Map;

public class WeekAvailabilityResponse {
    // {day: {times: count}
    private Map<LocalDate, Map<Timeslot, Integer>> weekAvailabilityMap;

    public WeekAvailabilityResponse() {
    }

    public WeekAvailabilityResponse(Map<LocalDate, Map<Timeslot, Integer>> weekAvailabilityMap) {
        this.weekAvailabilityMap = weekAvailabilityMap;
    }

    public Map<LocalDate, Map<Timeslot, Integer>> getWeekAvailabilityMap() {
        return weekAvailabilityMap;
    }

    public void setWeekAvailabilityMap(Map<LocalDate, Map<Timeslot, Integer>> weekAvailabilityMap) {
        this.weekAvailabilityMap = weekAvailabilityMap;
    }
}
