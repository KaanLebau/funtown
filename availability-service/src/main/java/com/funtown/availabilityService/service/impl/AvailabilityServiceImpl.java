package com.funtown.availabilityService.service.impl;

import com.funtown.availabilityService.model.Availability;
import com.funtown.availabilityService.model.api.UpdateStatusRequest;
import com.funtown.availabilityService.repository.AvailabilityRepository;
import com.funtown.availabilityService.service.AvailabilityService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;

import java.util.List;

/**
 * This class represents an implementation of the AvailabilityService interface. It provides methods for managing availability-related operations.
 */
@Service
@RequiredArgsConstructor
public class AvailabilityServiceImpl implements AvailabilityService {
    private final AvailabilityRepository repository;
    @Override
    public List<Availability> findByUsername(String userName) throws Exception {
        return repository.findByUsername(userName)
                .orElseThrow(()-> new Exception("no availability with this person id exists")
                );
    }

    /**
     * Retrieves an availability by its ID.
     *
     * @param id The identifier of the availability.
     * @return The availability with the specified ID.
     * @throws Exception If an error occurs during the operation or if the availability is not found.
     */
    @Override
    public Availability findById(Integer id) throws Exception {
        return repository.findById(id)
                .orElseThrow(()-> new Exception("availability not found")
                );
    }

    /**
     * Retrieves all availabilities.
     *
     * @return A list of all availabilities.
     */
    @Override
    public List<Availability> findAll() {
        return repository.findAll();
    }

    /**
     * Saves a new availability or updates an existing one.
     *
     * @param availability The availability to save or update.
     * @return The saved or updated availability.
     * @throws Exception If an error occurs during the operation.
     */
    public Availability save(Availability availability) throws Exception{
        Availability av = null;
        try {
            av = repository.save(availability);
        } catch (Exception e){
            throw new Exception("could not create availability");
        }
        return av;
    }

    /**
     * Updates the status of an availability based on the provided request.
     *
     * @param request The request containing the updated status information.
     * @return The updated availability.
     * @throws Exception If an error occurs during the operation.
     */
    @Transactional
    @Override
    public Availability updateStatus(UpdateStatusRequest request) throws Exception {
        Availability av = repository.findById(request.id()).orElseThrow(
                () -> new Exception("could not find availability")
        );
        av.setStatus(request.status());
        return repository.save(av);
    }

    /**
     * Updates the information of an availability.
     *
     * @param availability The availability with updated information.
     * @return The updated availability.
     * @throws Exception If an error occurs during the operation.
     */
    @Transactional()
    @Override
    public Availability updateAvailability(Availability availability) throws Exception {
        //TODO Kaan har skapat testa denna service!!!
        Availability availabilityUpdated = repository.findById(availability.getId()).get();
        availabilityUpdated.setFromDate(availability.getFromDate());
        availabilityUpdated.setToDate(availability.getToDate());
        return repository.save(availabilityUpdated);

    }
}