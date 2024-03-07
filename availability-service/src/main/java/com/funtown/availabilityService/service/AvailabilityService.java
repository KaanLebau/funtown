package com.funtown.availabilityService.service;

import com.funtown.availabilityService.model.Availability;
import com.funtown.availabilityService.model.api.UpdateStatusRequest;

import java.util.List;
/**
 * Service interface for managing availability-related operations.
 */
public interface AvailabilityService {

    /**
     * Retrieves a list of availabilities based on the applicant's username.
     * @param username The applicant's username.
     * @return A list of availabilities associated with the specified username.
     * @throws Exception If an error occurs during the operation.
     */
    List<Availability> findByUsername(String username) throws Exception;

    /**
     * Retrieves an availability by its id.
     * @param id The identifier of the availability.
     * @return The availability with the specified ID.
     * @throws Exception If an error occurs during the operation.
     */
    Availability findById(Integer id) throws Exception;

    /**
     * Retrieves all availabilities.
     * @return A list of all availabilities.
     */
    List<Availability> findAll();

    /**
     * Saves a new availability or updates an existing one.
     * @param availability The availability to save or update.
     * @return The saved or updated availability.
     * @throws Exception If an error occurs during the operation.
     */
    Availability save(Availability availability) throws Exception;

    /**
     * Updates the status of an availability based on the provided request.
     * @param request The request containing the updated status information.
     * @return The updated availability.
     * @throws Exception If an error occurs during the operation.
     */
    Availability updateStatus(UpdateStatusRequest request) throws Exception;

    /**
     * Updates the information of an availability.
     * @param availability The availability with updated information.
     * @return The updated availability.
     * @throws Exception If an error occurs during the operation.
     */
    Availability updateAvailability(Availability availability)throws Exception;//TODO Kaan har skapat testa denna service!!!
}