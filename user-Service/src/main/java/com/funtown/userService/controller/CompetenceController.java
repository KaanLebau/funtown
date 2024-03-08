package com.funtown.userService.controller;

import com.funtown.userService.model.Competence;
import com.funtown.userService.model.Person;
import com.funtown.userService.service.CompetenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The CompetenceController class handles HTTP requests for operations related to Competence entities.
 * It provides endpoints for retrieving a competence by ID and for saving a new competence.
 */
@RestController
@RequestMapping("/api/v1/competence") // Note: Check if the URL should be "/api/competence" for consistency.
@RequiredArgsConstructor
public class CompetenceController {
    private final CompetenceService service;

    /**
     * Retrieves a Competence entity by its ID.
     *
     * @param Id The ID of the Competence to retrieve.
     * @return A {@link ResponseEntity} containing the found Competence entity or a Not Found status if no Competence with the given ID exists.
     */
    @GetMapping("/id/{id}")
    public ResponseEntity<Competence> get(@PathVariable("id") Integer Id) {
        try {
            return ResponseEntity.ok(service.getById(Id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/list")
    ResponseEntity<List<Competence>> competenceList(){
        try{
            return ResponseEntity.ok((List<Competence>) service.getAll());
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    /**
     * Saves a new Competence entity to the database.
     * The status code of the response is set to 201 Created upon successful creation.
     *
     * @param competence The Competence entity to be saved.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Competence competence) {
        service.saveCompetence(competence);
    }
    @GetMapping("/competencelist")
    public List<Competence> getCompetenceList(){
        List<Competence> list = null;
        return list;
    }
}