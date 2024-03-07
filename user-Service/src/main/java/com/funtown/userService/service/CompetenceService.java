package com.funtown.userService.service;

import com.funtown.userService.model.Competence;

import java.util.List;
import java.util.Optional;

/**
 * The CompetenceService interface provides methods to interact with the CompetenceRepository
 * and perform CRUD (create, read, update, delete) operations on Competence objects.
 */
public interface CompetenceService {
    Competence getById(Integer id) throws Exception;

    /**
     * Retrieves a list of all competences from the CompetenceRepository.
     *
     * @return a List of Competence objects representing all competences in the system.
     */
    List<Competence> getall();
    void saveCompetence(Competence competence);
}
