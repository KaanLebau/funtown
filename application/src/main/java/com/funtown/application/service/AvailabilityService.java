package com.funtown.application.service;

import com.funtown.application.model.Availability;
import com.funtown.application.model.api.UpdateStatusRequest;

import java.util.List;

public interface AvailabilityService {
    List<Availability> findByUserName(String userName) throws Exception;
    Availability findById(Integer id) throws Exception;
    List<Availability> findAll();
    Availability save(Availability availability) throws Exception;
    Availability updateStatus(UpdateStatusRequest request) throws Exception;
}