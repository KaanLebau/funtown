package com.funtown.availabilityService.repository;

import com.funtown.availabilityService.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for accessing and managing Availabilities in the database.
 * Extends JpaRepository to inherit basic CRUD operations.
 */

public interface AvailabilityRepository extends JpaRepository<Availability, Integer> {

    /**
     * Retrieves a list of availabilities based on the applicant's username.
     * @param username The username of the applicant.
     * @return An Optional containing a List of availabilities if found, or an empty Optional if none found.
     */
    Optional<List<Availability>> findByUsername(String username);
}

