package com.funtown.userService.controller;

import com.funtown.userService.Dtos.FullPersonDto;
import com.funtown.userService.Dtos.PersonDto;
import com.funtown.userService.model.Person;
import com.funtown.userService.security.JwtUtil;
import com.funtown.userService.service.PersonService;
import com.funtown.userService.service.impl.PersonServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * The PersonController class manages HTTP requests related to person entities within the userService.
 * It provides RESTful API functionalities for the CRUD operations (Retrieve, Create, Update, and Delete)
 * on person information through various endpoints.
 *
 * Most of the APIs are secured and need JWT for authentication.
 * Different roles have different access privilege for the APIs.
 */
@RestController
@RequestMapping("/api/v1/persons")
@RequiredArgsConstructor
public class PersonController {

    private final PersonServiceImpl personService;
    private JwtUtil jwtToken;
    private static final Logger logger = LoggerFactory.getLogger(PersonController.class);

    /**
     * Retrieves a list of all persons.
     *
     * @return A list of {@link PersonDto} instances representing all persons.
     */
    @GetMapping("/list")
    public List<PersonDto> getAllPersons() {
        return personService.findAll();
    }

    /**
     * Retrieves a specific person by their ID.
     *
     * @param id The ID of the person to retrieve.
     * @return A {@link ResponseEntity<FullPersonDto>} if the person is found,
     *         or a not found HTTP response otherwise.
     */
    @GetMapping("id/{id}")
    public ResponseEntity<FullPersonDto> getPersonById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(personService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    /**
     * Retrieves a specific person by their Username.
     *
     * @return A {@link ResponseEntity<FullPersonDto>} if the person is found,
     *         or a not found HTTP response otherwise.
     */
    @GetMapping("/username/{username}")
    ResponseEntity<FullPersonDto> getPersonByUsername(@PathVariable String username) {

        //Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        //String client = auth.getPrincipal().toString();
        System.out.println(username);

        try{
            return ResponseEntity.ok(personService.findByUsername(username)  );
        }catch (UsernameNotFoundException e){
            ResponseEntity.notFound().build();
        }
        return null;
    }



    /**
     * Creates a new person and saves it to the database.
     * Before calling this method, ensure no duplicate email or personal number exists.
     *
     * @param person The {@link Person} object to create. It should include person's details.
     * @return A {@link ResponseEntity<Person>} with the created {@link Person} and the HTTP status {@link "HttpStatus.CREATED"}
     *         if the operation was successful, an appropriate error response otherwise.
     */
    @PostMapping("/create")
    public ResponseEntity<Person> createPerson(@RequestBody Person person) {
        Person savedPerson = personService.save(person);
        return new ResponseEntity<>(savedPerson, HttpStatus.CREATED);
    }

    /**
     * Updates a person with the given ID in the database.
     * If the person is not found, a "Person not found" response entity with HTTP status code 404 will be returned.
     *
     * @param id            The ID of the person to update.
     * @param personDetails The {@link Person} object containing the updated details.
     * @return A {@link ResponseEntity} with the updated {@link Person} object and HTTP status code 200 if the update was successful,
     * or a "Person not found" response entity with HTTP status code 404 otherwise.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePerson(@PathVariable Integer id, @RequestBody Person personDetails) {
        Person updatedPerson = personService.updatePerson(id, personDetails);
        if (updatedPerson == null) {
            return new ResponseEntity<>("Person not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Person successfully updated", HttpStatus.OK);
    }
    /**
     * Deletes a person from the database based on their ID.
     * If the person is successfully deleted, the method returns a ResponseEntity with a success status code (200 OK) and a success message.
     * If the person cannot be found, the method returns a ResponseEntity with a not found status code (404 Not Found).
     *
     * @param id The ID of the person to delete.
     * @return A ResponseEntity representing the result of the delete operation.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePerson(@PathVariable Integer id) {
        if (!personService.deletePerson(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Person successfully deleted");
    }
}