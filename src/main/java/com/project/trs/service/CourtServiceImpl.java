package com.project.trs.service;

import com.project.trs.model.court.Court;
import com.project.trs.model.court.CourtType;
import com.project.trs.model.user.UserType;
import com.project.trs.repository.CourtRepository;
import com.project.trs.repository.CourtTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
