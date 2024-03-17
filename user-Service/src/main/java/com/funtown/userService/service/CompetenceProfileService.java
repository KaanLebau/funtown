package com.funtown.userService.service;

import com.funtown.userService.model.CompetenceProfile;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

/**
 * Service interface for managing competence profiles.
 * Defines the operations available for manipulating {@link CompetenceProfile} entities.
 */
public interface CompetenceProfileService {

    /**
     * Retrieves all competence profiles.
     *
     * @return A list of {@link CompetenceProfile} instances.
     */
    List<CompetenceProfile> findAll();

    /**
     * Retrieves a competence profile by its ID.
     *
     * @param id The ID of the competence profile to retrieve.
     * @return An {@link Optional} containing the found {@link CompetenceProfile} or empty if not found.
     */
    Optional<CompetenceProfile> findById(Integer id);

    List<CompetenceProfile> findByPersonId(Integer id) throws NoSuchElementException;

    /**
     * Saves a given competence profile. This can be used for both creating new profiles and updating existing ones.
     *
     * @param competenceProfile The {@link CompetenceProfile} to save.
     * @return The saved {@link CompetenceProfile} instance, now with an ID if it was newly created.
     */
    CompetenceProfile save(CompetenceProfile competenceProfile);

    /**
     * Deletes a given competence profile.
     *
     * @param competenceProfile The {@link CompetenceProfile} to delete.
     */
    void delete(CompetenceProfile competenceProfile);

    // Define any additional methods specific to CompetenceProfile if needed.
}
