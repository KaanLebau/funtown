package com.funtown.userService.service.impl;

import com.funtown.userService.model.Competence;
import com.funtown.userService.repository.CompetenceRepository;
import com.funtown.userService.service.CompetenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * This class is an implementation of the CompetenceService interface.
 * It provides methods to interact with the CompetenceRepository and perform CRUD operations on Competence objects.
 */
@Service
@RequiredArgsConstructor
public class CompetenceServiceImpl implements CompetenceService {
    private final CompetenceRepository repository;
    @Override
    public Competence getById(Integer id) throws Exception {
        return repository.findById(id)
                .orElseThrow(
                        ()-> new Exception("No competence with this id exists")
                );
    }


    /**
     * Retrieves a list of all competences from the CompetenceRepository.
     *
     * @return a List of Competence objects representing all competences in the system.
     */
    @Override
    public List<Competence> getAll() {
        List<Competence> hi = repository.findAll();
        System.out.println(hi);
        return hi;
    }

    /**
     * Saves a Competence object to the repository.
     *
     * @param competence the Competence object to be saved
     */
    @Override
    public void saveCompetence(Competence competence) {
        repository.save(competence);
    }
}
