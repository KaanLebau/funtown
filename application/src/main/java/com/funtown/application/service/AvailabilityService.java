package com.funtown.application.service;

import com.funtown.application.model.Availability;

public interface AvailabilityService {
    Availability getByPersonId(Integer id) throws Exception;
    void saveAvailability(Availability availability);
}
