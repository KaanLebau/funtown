package com.funtown.userService.service;

import com.funtown.userService.model.Competence;

import java.util.Optional;

public interface CompetenceService {
    Competence getById(Integer id) throws Exception;
    void saveCompetence(Competence competence);
}
