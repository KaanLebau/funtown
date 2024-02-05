package com.funtown.userService.controller;

import com.funtown.userService.model.Competence;
import com.funtown.userService.service.CompetenceService;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;

@RestController
@RequestMapping("/api/compotence")
@RequiredArgsConstructor
public class CompetenceController {
private final CompetenceService service;

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Competence> get(@PathVariable("id") Integer Id){
        try{
            return ResponseEntity.ok(service.getById(Id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody Competence competence){
        service.saveCompetence(competence);
    }
}
