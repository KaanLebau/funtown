package com.funtown.userService.controller;

import com.funtown.userService.model.CompetenceProfile;
import com.funtown.userService.service.CompetenceProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for handling requests related to Competence Profiles.
 * Provides endpoints for CRUD operations on competence profiles.
 */
@RestController
@RequestMapping("/api/v1/competenceprofiles")
@RequiredArgsConstructor
public class CompetenceProfileController {

    private final CompetenceProfileService competenceProfileService;

    /**
     * Retrieves all competence profiles.
     *
     * @return A list of {@link CompetenceProfile} instances.
     */
    @GetMapping("/get-all")
    public List<CompetenceProfile> getAllCompetenceProfiles() {
        return competenceProfileService.findAll();
    }

    /**
     * Retrieves a single competence profile by its ID.
     *
     * @param id The ID of the competence profile to retrieve.
     * @return A {@link ResponseEntity} containing the requested {@link CompetenceProfile}
     *         or a not found status if the competence profile does not exist.
     */
    @GetMapping("/id/{id}")
    public ResponseEntity<CompetenceProfile> getCompetenceProfileById(@PathVariable Integer id) {
        return competenceProfileService.findById(id)
                .map(competenceProfile -> ResponseEntity.ok().body(competenceProfile))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Creates a new competence profile.
     *
     * @param competenceProfile The {@link CompetenceProfile} to create.
     * @return A {@link ResponseEntity} containing the created {@link CompetenceProfile}
     *         with HTTP status {@link HttpStatus#CREATED}.
     */
    @PostMapping("/create")
    public ResponseEntity<CompetenceProfile> createCompetenceProfile(@RequestBody CompetenceProfile competenceProfile) {
        CompetenceProfile savedCompetenceProfile = competenceProfileService.save(competenceProfile);
        return new ResponseEntity<>(savedCompetenceProfile, HttpStatus.CREATED);
    }

    /**
     * Updates an existing competence profile.
     *
     * @param id The ID of the competence profile to update.
     * @param competenceProfileDetails The updated competence profile details.
     * @return A {@link ResponseEntity} containing the updated {@link CompetenceProfile}
     *         or a not found status if the competence profile does not exist.
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<CompetenceProfile> updateCompetenceProfile(@PathVariable Integer id, @RequestBody CompetenceProfile competenceProfileDetails) {
        return competenceProfileService.findById(id)
                .map(competenceProfile -> {
                    // Update fields as needed
                    CompetenceProfile updatedCompetenceProfile = competenceProfileService.save(competenceProfile);
                    return ResponseEntity.ok().body(updatedCompetenceProfile);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Deletes a competence profile by its ID.
     *
     * @param id The ID of the competence profile to delete.
     * @return A {@link ResponseEntity} indicating the outcome of the delete operation.
     */
    @DeleteMapping("/delete/{id}")
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
