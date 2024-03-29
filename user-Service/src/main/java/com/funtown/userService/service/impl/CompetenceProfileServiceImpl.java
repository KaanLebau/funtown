package com.funtown.userService.service.impl;

import com.funtown.userService.model.CompetenceProfile;
import com.funtown.userService.repository.CompetenceProfileRepository;
import com.funtown.userService.service.CompetenceProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

/**
 * Service implementation for managing competence profiles.
 * Implements {@link CompetenceProfileService} to provide CRUD operations on {@link CompetenceProfile} entities.
 */
@Service
@RequiredArgsConstructor
public class CompetenceProfileServiceImpl implements CompetenceProfileService {

    private final CompetenceProfileRepository competenceProfileRepository;

    /**
     * Retrieves all competence profiles stored in the database.
     *
     * @return A list of {@link CompetenceProfile} instances.
     */
    @Override
    public List<CompetenceProfile> findAll() {
        return competenceProfileRepository.findAll();
    }

    /**
     * Retrieves a competence profile by its ID.
     *
     * @param id The ID of the competence profile to retrieve.
     * @return An {@link Optional} containing the found {@link CompetenceProfile} or empty if not found.
     */
    @Override
    public Optional<CompetenceProfile> findById(Integer id) {
        return competenceProfileRepository.findById(id);
    }

    @Override
    public List<CompetenceProfile> findByPersonId(Integer id) throws NoSuchElementException {
        List<CompetenceProfile> competenceProfile = new ArrayList<>();
        try{
            competenceProfile = competenceProfileRepository.findByPersonId(id);
        } catch (Exception e ){
            throw new NoSuchElementException("Competences do not exist");
        }
        return competenceProfile;
    }

    /**
     * Saves a given competence profile to the database.
     * This method is used for both creating a new profile and updating an existing one.
     *
     * @param competenceProfile The {@link CompetenceProfile} to save.
     * @return The saved {@link CompetenceProfile} instance, now with an ID if it was newly created.
     */
    @Override
    public CompetenceProfile save(CompetenceProfile competenceProfile) {
        return competenceProfileRepository.save(competenceProfile);
    }

    /**
     * Deletes a given competence profile from the database.
     *
     * @param competenceProfile The {@link CompetenceProfile} to delete.
     */
    @Override
    public void delete(CompetenceProfile competenceProfile) {
        competenceProfileRepository.delete(competenceProfile);
    }

    // Implement additional methods as per the interface definition, if any.
}
