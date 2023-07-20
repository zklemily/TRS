package com.project.trs.service;

import com.project.trs.model.court.CourtType;
import com.project.trs.repository.CourtTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourtTypeServiceImpl implements CourtTypeService{
    @Autowired
    CourtTypeRepository courtTypeRepository;

    @Override
    public CourtType getCourtTypeById(int id) {
        return courtTypeRepository.findById(id).orElseThrow();
    }
}
