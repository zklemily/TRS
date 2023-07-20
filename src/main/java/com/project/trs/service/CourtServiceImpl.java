package com.project.trs.service;

import com.project.trs.dto.Timeslot;
import com.project.trs.model.court.Court;
import com.project.trs.model.court.CourtType;
import com.project.trs.repository.CourtRepository;
import com.project.trs.repository.CourtTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CourtServiceImpl implements CourtService {
    @Autowired
    CourtRepository courtRepository;
    @Autowired
    CourtTypeRepository courtTypeRepository;

    @Override
    public Court addCourt(Court court) {
        // Fetch the existing UserType based on the provided type
        CourtType existingCourtType = courtTypeRepository.findByType(court.getCourtType().getType());

        // Set the fetched UserType to the User entity
        court.setCourtType(existingCourtType);
        return courtRepository.save(court);
    }

    @Override
    public List<Court> getAllCourts() {
        return courtRepository.findAll();
    }

    @Override
    public Court getCourtById(int id) {
        return courtRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Court> getCourtsByType(String type) {
        CourtType ct = courtTypeRepository.findByType(type);
        return courtRepository.findByCourtTypeId(ct.getId());
    }

    @Override
    public List<Timeslot> getAvailabilityByDay(int courtId, LocalDate date) {
        // generate a list of start and end times
        List<LocalTime> times = new ArrayList<>();

        LocalTime startTime = LocalTime.of(7, 0); // Start time at 7 a.m.
        LocalTime endTime = LocalTime.of(22, 0); // End time at 10 p.m.
        LocalTime currentTime = startTime;
        while (currentTime.isBefore(endTime.plusHours(1))) {
            times.add(currentTime);
            currentTime = currentTime.plusHours(1);
        }
        // get availability of each hour
        List<Timeslot> timeslots = new ArrayList<>();
        for (int i = 0; i < times.size() - 1; i++) {
            Timestamp start = Timestamp.valueOf(LocalDateTime.of(date, times.get(i)));
            Timestamp end = Timestamp.valueOf(LocalDateTime.of(date, times.get(i + 1)));
            long isReserved = courtRepository.courtReserved(courtId, start, end);
            timeslots.add(new Timeslot(start, end, isReserved == 0));
        }
        times.clear();
        return timeslots;
    }
}
