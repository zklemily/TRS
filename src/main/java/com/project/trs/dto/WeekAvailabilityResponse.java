package com.project.trs.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class WeekAvailabilityResponse {
    // {day: {times: count}
    private Map<LocalDate, List<Timeslot>> weekAvailabilityMap;

    public WeekAvailabilityResponse() {
    }

    public WeekAvailabilityResponse(Map<LocalDate, List<Timeslot>> weekAvailabilityMap) {
        this.weekAvailabilityMap = weekAvailabilityMap;
    }

    public Map<LocalDate, List<Timeslot>> getWeekAvailabilityMap() {
        return weekAvailabilityMap;
    }

    public void setWeekAvailabilityMap(Map<LocalDate, List<Timeslot>> weekAvailabilityMap) {
        this.weekAvailabilityMap = weekAvailabilityMap;
    }
}
