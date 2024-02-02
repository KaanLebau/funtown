package com.funtown.application.service.impl;

import com.funtown.application.model.Availability;
import com.funtown.application.repository.AvailabilityRepository;
import com.funtown.application.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AvailabilityServiceImpl implements AvailabilityService {
    private final AvailabilityRepository repository;
    @Override
    public Availability getByPersonId(Integer id) throws Exception {
        return repository.findByPersonId(id)
                .orElseThrow(()-> new Exception("no availability with this person id exists")
                );
    }
   public void saveAvailability(Availability availability){
         repository.save(availability);
    }
}
