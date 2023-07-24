package com.project.trs.service;

import com.project.trs.dto.Timeslot;
import com.project.trs.model.court.Court;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

public interface CourtService {
    Court addCourt(Court court);

    List<Court> getAllCourts();

    Court getCourtById(int id);

    List<Court> getCourtsByType(String type);

    List<Court> getAvailableCourts(Timestamp start, Timestamp end);

    List<Timeslot> getAvailabilityByDay(int courtId, LocalDate date);
}
