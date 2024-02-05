package com.funtown.userService.controller;

import com.funtown.userService.model.Person;
import com.funtown.userService.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persons")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;

    // Get all persons
    @GetMapping
    public List<Person> getAllPersons() {
        return personService.findAll();
    }

    // Get a single person by ID
    @GetMapping("/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable Integer id) {
        return personService.findById(id)
                .map(person -> ResponseEntity.ok().body(person))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new person
    @PostMapping
    public ResponseEntity<Person> createPerson(@RequestBody Person person) {
        Person savedPerson = personService.save(person);
        return new ResponseEntity<>(savedPerson, HttpStatus.CREATED);
    }

    // Update an existing person
    @PutMapping("/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable Integer id, @RequestBody Person personDetails) {
        return personService.findById(id)
                .map(person -> {
                    person.setName(personDetails.getName());
                    person.setEmail(personDetails.getEmail());
                    Person updatedPerson = personService.save(person);
                    return ResponseEntity.ok().body(updatedPerson);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a person
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePerson(@PathVariable Integer id) {
        return personService.findById(id)
                .map(person -> {
                    personService.delete(person);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Additional helper methods or endpoints can be added here

}
