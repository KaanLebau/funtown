package com.funtown.userService.controller;

import com.funtown.userService.Dtos.FullPersonDto;
import com.funtown.userService.Dtos.PersonDto;
import com.funtown.userService.model.Person;
import com.funtown.userService.security.JwtUtil;
import com.funtown.userService.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * The PersonController class manages HTTP requests related to person entities within the userService.
 * It provides functionalities to retrieve, create, update, and delete person information through various endpoints.
 */
@RestController
@RequestMapping("/api/persons")
@RequiredArgsConstructor
public class PersonController {
    @Autowired
    private final PersonService personService;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    /**
     * Test endpoint to verify JWT token.
     *
     * @param request HttpServletRequest received from the client.
     * @return ResponseEntity with HTTP status OK if the JWT token is valid or Unauthorized if it's not.
     */
    @GetMapping("/test-token")
    @Secured("ROLE_APPLICANT")
    public String verifyJwtToken(HttpServletRequest request) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("PRINCIPAL:");
        System.out.println(auth.getPrincipal());
        System.out.println("roles:");
        List<String> list = auth.getAuthorities().stream().map(Object::toString).toList();
        for (String str : list ){
            System.out.println(str);
        }
        return "welcome Applicant";
    }

    @GetMapping("/rec-token")
    @Secured("ROLE_RECRUITER")
    public String recruiterTest(HttpServletRequest request) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("PRINCIPAL:");
        System.out.println(auth.getPrincipal());
        System.out.println("roles:");
        List<String> list = auth.getAuthorities().stream().map(Object::toString).toList();
        for (String str : list ){
            System.out.println(str);
        }
        return "welcome Recruiter";
    }

    /**
     * Retrieves a list of all persons.
     *
     * @return A list of {@link PersonDto} instances representing all persons.
     */
    @GetMapping
    public List<PersonDto> getAllPersons() {
        return personService.findAll();
    }

    /**
     * Retrieves a specific person by their ID.
     *
     * @param id The ID of the person to retrieve.
     * @return A {@link ResponseEntity} containing a {@link FullPersonDto} if the person is found,
     *         or a not found response otherwise.
     */
    @GetMapping("/{id}")
    public ResponseEntity<FullPersonDto> getPersonById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(personService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Creates a new person and saves it to the database.
     * Before calling this method, ensure no duplicate email or personal number exists.
     *
     * @param person The {@link Person} object to create.
     * @return A {@link ResponseEntity} with the created {@link Person} and the HTTP status {@link "HttpStatus.CREATED"}.
     */
    @PostMapping("/create")
    public ResponseEntity<Person> createPerson(@RequestBody Person person) {
        Person savedPerson = personService.save(person);
        return new ResponseEntity<>(savedPerson, HttpStatus.CREATED);
    }

    // Update an existing person
    /**
     * Updates the details of an existing person identified by their ID with the provided person details.
     * It updates attributes like name, email, etc., based on the provided {@link Person} object.
     *
     * @param id The ID of the person to update.
     * @param personDetails A {@link Person} object containing the updated details of the person.
     * @return A {@link ResponseEntity} with the updated {@link Person} if the update is successful,
     *         or an appropriate error response otherwise.
     */
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

    }*/


    // Delete a person

    /**
     * Deletes a person identified by their ID.
     *
     * @param id The ID of the person to delete.
     * @return A {@link ResponseEntity} indicating success (HTTP 200 OK) if the person was successfully deleted,
     *         or a not found (HTTP 404 Not Found) response if the person does not exist.
     */

    /*
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
