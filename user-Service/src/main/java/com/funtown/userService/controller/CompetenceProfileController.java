package com.funtown.userService.controller;

import com.funtown.userService.model.CompetenceProfile;
import com.funtown.userService.service.CompetenceProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/competence-profiles")
@RequiredArgsConstructor
public class CompetenceProfileController {

    private final CompetenceProfileService competenceProfileService;

    // Get all competence profiles
    @GetMapping
    public List<CompetenceProfile> getAllCompetenceProfiles() {
        return competenceProfileService.findAll();
    }

    // Get a single competence profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<CompetenceProfile> getCompetenceProfileById(@PathVariable Integer id) {
        return competenceProfileService.findById(id)
                .map(competenceProfile -> ResponseEntity.ok().body(competenceProfile))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new competence profile
    @PostMapping
    public ResponseEntity<CompetenceProfile> createCompetenceProfile(@RequestBody CompetenceProfile competenceProfile) {
        CompetenceProfile savedCompetenceProfile = competenceProfileService.save(competenceProfile);
        return new ResponseEntity<>(savedCompetenceProfile, HttpStatus.CREATED);
    }

    // Update an existing competence profile
    @PutMapping("/{id}")
    public ResponseEntity<CompetenceProfile> updateCompetenceProfile(@PathVariable Integer id, @RequestBody CompetenceProfile competenceProfileDetails) {
        return competenceProfileService.findById(id)
                .map(competenceProfile -> {
                    // Update fields as needed
                    CompetenceProfile updatedCompetenceProfile = competenceProfileService.save(competenceProfile);
                    return ResponseEntity.ok().body(updatedCompetenceProfile);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a competence profile
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompetenceProfile(@PathVariable Integer id) {
        return competenceProfileService.findById(id)
                .map(competenceProfile -> {
                    competenceProfileService.delete(competenceProfile);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Additional helper methods or endpoints can be added here

}
