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

    public List<CompetenceProfile> findAll() {
        return competenceProfileRepository.findAll();
    }

    public Optional<CompetenceProfile> findById(Integer id) {
        return competenceProfileRepository.findById(id);
    }

    public CompetenceProfile save(CompetenceProfile competenceProfile) {
        return competenceProfileRepository.save(competenceProfile);
    }

    public void delete(CompetenceProfile competenceProfile) {
        competenceProfileRepository.delete(competenceProfile);
    }

    // Example of additional business logic for CompetenceProfile
    // You can add custom methods specific to CompetenceProfile here.
}
