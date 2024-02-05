package com.funtown.userService.service.impl;

import com.funtown.userService.model.Competence;
import com.funtown.userService.repository.CompetenceRepository;
import com.funtown.userService.service.CompetenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    @Override
    public void saveCompetence(Competence competence) {
        repository.save(competence);
    }
}
