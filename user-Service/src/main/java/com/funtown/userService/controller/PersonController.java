package com.funtown.userService.controller;

import com.funtown.userService.Dtos.FullPersonDto;
import com.funtown.userService.Dtos.PersonDto;
import com.funtown.userService.model.Person;
import com.funtown.userService.service.PersonService;
import lombok.RequiredArgsConstructor;
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
    public List<PersonDto> getAllPersons() {
        return personService.findAll();
    }



    // Get a single person by ID
    @GetMapping("/{id}")
    public ResponseEntity<FullPersonDto> getPersonById(@PathVariable Integer id) {
      try {
          return ResponseEntity.ok(personService.findById(id));
      } catch (Exception e){
          return ResponseEntity.notFound().build();
        }
    }

    // Create a new person
//    check no duplicate email and pnr and so on and so on

    @PostMapping("/create")
    public ResponseEntity<Person> createPerson(@RequestBody Person person) {
        Person savedPerson = personService.save(person);
        return new ResponseEntity<>(savedPerson, HttpStatus.CREATED);
    }

    // Update an existing person
    /*
        @PutMapping("/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable Integer id, @RequestBody Person personDetails) {
        try{
            personService.findById(id).builder()
                    .map(person -> {
                        person.setName(personDetails.getName());
                        person.setEmail(personDetails.getEmail());
                        // Here you might want to set more attributes as needed
                        Person updatedPerson = personService.save(person);
                        return ResponseEntity.ok().body(updatedPerson);
                    });
        } catch(Exception e) {}

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
     */



}
