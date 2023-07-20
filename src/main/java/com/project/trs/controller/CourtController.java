package com.project.trs.controller;

import com.project.trs.dto.CourtAvailabilityResponse;
import com.project.trs.dto.Timeslot;
import com.project.trs.dto.WeekAvailabilityResponse;
import com.project.trs.model.court.Court;
import com.project.trs.service.CourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/courts")
@CrossOrigin
public class CourtController {
    @Autowired
    CourtService courtService;

    @PostMapping("")
    public ResponseEntity<String> add(@RequestBody Court court) {
        courtService.addCourt(court);
        return ResponseEntity.ok("Court is added.");
    }

    @GetMapping("")
    public List<Court> getAllCourts() {
        return courtService.getAllCourts();
    }

    @GetMapping("/{id}")
    public Court getCourtById(@PathVariable int id) {
        return courtService.getCourtById(id);
    }

    @GetMapping("/search")
    public List<Court> getCourtsByType(@RequestParam("type") String type) {
        return courtService.getCourtsByType(type);
    }

    // get the availability of each court over the next 7 days
    @GetMapping("/court-availability")
    public CourtAvailabilityResponse getCourtAvailability() {
        Map<Integer, Map<LocalDate, List<Timeslot>>> courtAvailabilityMap = new HashMap<>();

        // loop through all courts
        List<Court> courts = courtService.getAllCourts();
        for (Court court : courts) {
            // loop through next 7 days
            Map<LocalDate, List<Timeslot>> dayMap = new HashMap<>();
            for (int i = 0; i < 7; i++) {
                LocalDate date = LocalDate.now().plusDays(i);
                // get timeslots and availability for each day
                List<Timeslot> timeslots = courtService.getAvailabilityByDay(court.getId(), date);
                dayMap.put(date, timeslots);
            }
            courtAvailabilityMap.put(court.getId(), dayMap);
        }
        return new CourtAvailabilityResponse(courtAvailabilityMap);
    }

    // get the availability of each hour over the next 7 days
    @GetMapping("/week-availability")
    public WeekAvailabilityResponse getWeekAvailability() {
        // {day: {timeslots}
        Map<LocalDate, List<Timeslot>> weekAvailabilityMap = new HashMap<>();
        for (int i = 0; i < 7; i++) {
            LocalDate date = LocalDate.now().plusDays(i);
            weekAvailabilityMap.put(date, new ArrayList<>());
        }

        // get availability by court
        Map<Integer, Map<LocalDate, List<Timeslot>>> courtAvailabilityMap = getCourtAvailability().getCourtAvailabilityMap();

        for (Map.Entry<Integer, Map<LocalDate, List<Timeslot>>> dateMap : courtAvailabilityMap.entrySet()) {
            int curCourt = dateMap.getKey();
            for (Map.Entry<LocalDate, List<Timeslot>> dateAndMap : dateMap.getValue().entrySet()) {
                List<Timeslot> timeAndCount = weekAvailabilityMap.get(dateAndMap.getKey());
                for (Timeslot timeslot : dateAndMap.getValue()) {
                    Timeslot existingTimeslot = timeslotInList(timeAndCount, timeslot);
                    if (existingTimeslot == null) {
                        existingTimeslot = new Timeslot(timeslot.getStartTime(), timeslot.getEndTime(), timeslot.isAvailable());
                        List<Integer> courts = existingTimeslot.getCourts();
                        if (timeslot.isAvailable()) {
                            existingTimeslot.setCount(1);
                            courts.add(curCourt);
                            existingTimeslot.setCourts(courts);
                        } else {
                            existingTimeslot.setCount(0);
                        }
                        timeAndCount.add(existingTimeslot);
                    } else {
                        List<Integer> courts = existingTimeslot.getCourts();
                        if (timeslot.isAvailable()) {
                            existingTimeslot.setCount(existingTimeslot.getCount() + 1);
                            courts.add(curCourt);
                            existingTimeslot.setCourts(courts);
                        }
                    }
                }
            }
        }
        return new WeekAvailabilityResponse(weekAvailabilityMap);
    }

    private Timeslot timeslotInList(List<Timeslot> timeslots, Timeslot timeslot) {
        for (Timeslot t : timeslots) {
            if (t.equals(timeslot)) {
                return t;
            }
        }
        return null;
    }
}
