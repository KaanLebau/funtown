package com.funtown.application.service;

import com.funtown.application.model.Availability;
import java.util.List;

public interface AvailabilityService {
    List<Availability> findByPersonId(Integer id) throws Exception;
    Availability findById(Integer id) throws Exception;
    List<Availability> findAll();
    void save(Availability availability);
}
