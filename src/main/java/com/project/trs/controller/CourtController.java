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
        // {day: {times: count}
        Map<LocalDate, Map<Timeslot, Integer>> weekAvailabilityMap = new HashMap<>();
        for (int i = 0; i < 7; i++) {
            LocalDate date = LocalDate.now().plusDays(i);
            weekAvailabilityMap.put(date, new HashMap<>());
        }

        Map<Integer, Map<LocalDate, List<Timeslot>>> courtAvailabilityMap = getCourtAvailability().getCourtAvailabilityMap();
        for (Map<LocalDate, List<Timeslot>> dateMap : courtAvailabilityMap.values()) {
            for (Map.Entry<LocalDate, List<Timeslot>> dateAndMap : dateMap.entrySet()) {
                Map<Timeslot, Integer> timeAndCount = weekAvailabilityMap.get(dateAndMap.getKey());
                for (Timeslot timeslot : dateAndMap.getValue()) {
                    if (!timeAndCount.containsKey(timeslot)) {
                        if (timeslot.isAvailable()) {
                            timeAndCount.put(timeslot, 1);
                        } else {
                            timeAndCount.put(timeslot, 0);
                        }
                    } else {
                        if (timeslot.isAvailable()) {
                            timeAndCount.put(timeslot, timeAndCount.get(timeslot) + 1);
                        }
                    }
                }
            }
        }
        return new WeekAvailabilityResponse(weekAvailabilityMap);
    }


}
