/**
 * The CompetenceProfileRepository interface is a Spring Data JPA repository interface for performing database operations
 * related to the CompetenceProfile entity.
 *
 * It extends JpaRepository, which provides built-in CRUD (Create, Read, Update, Delete) operations for the CompetenceProfile entity.
 * The generic types specify that this repository handles CompetenceProfile entities, and the ID type is Integer.
 *
 * This interface also defines additional custom query methods for retrieving CompetenceProfile entities by personId and competenceId.
 */
package com.funtown.userService.repository;

import com.funtown.userService.model.CompetenceProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompetenceProfileRepository extends JpaRepository<CompetenceProfile, Integer> {
    /**
     * Retrieve a list of CompetenceProfile entities by personId.
     *
     * @param personId The personId to search for.
     * @return A list of CompetenceProfile entities associated with the given personId.
     */
    List<CompetenceProfile> findByPersonId(Integer personId);

    /**
     * Retrieve a list of CompetenceProfile entities by competenceId.
     *
     * @param competenceId The competenceId to search for.
     * @return A list of CompetenceProfile entities associated with the given competenceId.
     */
    List<CompetenceProfile> findByCompetenceId(Integer competenceId);
}
