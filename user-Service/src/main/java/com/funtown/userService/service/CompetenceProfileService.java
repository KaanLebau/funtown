/**
 * The CompetenceProfileService class provides service methods for performing operations related to CompetenceProfile entities.
 * It serves as a bridge between the controller layer and the repository layer, encapsulating business logic.
 *
 * This class is annotated with the @Service annotation, indicating that it is a Spring service component.
 * It is also annotated with @RequiredArgsConstructor, which generates a constructor with required dependencies.
 */
package com.funtown.userService.service;

import com.funtown.userService.model.CompetenceProfile;
import com.funtown.userService.repository.CompetenceProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompetenceProfileService {

    private final CompetenceProfileRepository competenceProfileRepository;

    /**
     * Retrieve a list of all CompetenceProfile entities in the database.
     *
     * @return A list of CompetenceProfile entities representing all competence profiles in the database.
     */
    public List<CompetenceProfile> findAll() {
        return competenceProfileRepository.findAll();
    }

    /**
     * Retrieve a CompetenceProfile entity by its unique identifier (id).
     *
     * @param id The unique identifier of the CompetenceProfile to retrieve.
     * @return An Optional containing the CompetenceProfile entity with the given id, if found.
     */
    public Optional<CompetenceProfile> findById(Integer id) {
        return competenceProfileRepository.findById(id);
    }

    /**
     * Save a CompetenceProfile entity to the database.
     *
     * @param competenceProfile The CompetenceProfile entity to be saved.
     * @return The saved CompetenceProfile entity.
     */
    public CompetenceProfile save(CompetenceProfile competenceProfile) {
        return competenceProfileRepository.save(competenceProfile);
    }

    /**
     * Delete a CompetenceProfile entity from the database.
     *
     * @param competenceProfile The CompetenceProfile entity to be deleted.
     */
    public void delete(CompetenceProfile competenceProfile) {
        competenceProfileRepository.delete(competenceProfile);
    }

    // Example of additional business logic for CompetenceProfile
    // You can add custom methods specific to CompetenceProfile here.
}
