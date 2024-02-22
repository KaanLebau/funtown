package com.funtown.application.service.impl;

import com.funtown.application.model.Availability;
import com.funtown.application.model.api.UpdateStatusRequest;
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
    public List<Availability> findByUserName(String userName) throws Exception {
        return repository.findByUserName(userName)
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

    public Availability save(Availability availability) throws Exception{
        Availability av = null;
        try {
            av = repository.save(availability);
        } catch (Exception e){
            throw new Exception("could not create availability");
        }
        return av;
    }

    @Override
    public Availability updateStatus(UpdateStatusRequest request) throws Exception {
        Availability av = repository.findById(request.id()).orElseThrow(
                () -> new Exception("could not find availability")
        );
        av.setStatus(request.status());
        return repository.save(av);
    }
}
