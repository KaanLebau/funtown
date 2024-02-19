package com.funtown.application.service.impl;

import com.funtown.application.model.Availability;
import com.funtown.application.repository.AvailabilityRepository;
import com.funtown.application.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AvailabilityServiceImpl implements AvailabilityService {
    private final AvailabilityRepository repository;
    @Override
    public List<Availability> findByPersonId(Integer id) throws Exception {
        return repository.findByPersonId(id)
                .orElseThrow(()-> new Exception("no availability with this person id exists")
                );
    }

    @Override
    public Availability findById(Integer id) throws Exception {
        return repository.findById(id)
                .orElseThrow(()-> new Exception("availability not found")
                );
    }

    @Override
    public List<Availability> findAll() {
        return repository.findAll();
    }

    public void save(Availability availability){
        repository.save(availability);
    }
}
