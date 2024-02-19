package com.funtown.userService.service;

import com.funtown.userService.model.Competence;

import java.util.Optional;

/**
 * The CompetenceService interface provides methods to interact with the CompetenceRepository
 * and perform CRUD (create, read, update, delete) operations on Competence objects.
 */
public interface CompetenceService {
    Competence getById(Integer id) throws Exception;
    void saveCompetence(Competence competence);
}
