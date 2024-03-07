package com.funtown.availabilityService.service;

import com.funtown.availabilityService.model.Availability;
import com.funtown.availabilityService.model.api.UpdateStatusRequest;

import java.util.List;

public interface AvailabilityService {
    List<Availability> findByUsername(String username) throws Exception;
    Availability findById(Integer id) throws Exception;
    List<Availability> findAll();
    Availability save(Availability availability) throws Exception;
    Availability updateStatus(UpdateStatusRequest request) throws Exception;
}