package com.project.trs.service;

import com.project.trs.model.court.Court;

import java.util.List;

public interface CourtService {
    Court addCourt(Court court);

    List<Court> getAllCourts();

    Court getCourtById(int id);

    List<Court> getCourtsByType(String type);
}
