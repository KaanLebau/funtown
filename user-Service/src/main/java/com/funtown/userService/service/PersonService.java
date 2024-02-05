/**
 * The PersonService class provides service methods for performing operations related to Person entities.
 * It serves as a bridge between the controller layer and the repository layer, encapsulating business logic.
 *
 * This class is annotated with the @Service annotation, indicating that it is a Spring service component.
 * It is also annotated with @RequiredArgsConstructor, which generates a constructor with required dependencies.
 */
package com.funtown.userService.service;

import com.funtown.userService.model.Person;
import com.funtown.userService.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonService {

    private final PersonRepository personRepository;

    /**
     * Retrieve a list of all persons in the database.
     *
     * @return A list of Person entities representing all persons in the database.
     */
    public List<Person> findAll() {
        return personRepository.findAll();
    }

    /**
     * Retrieve a Person entity by its unique identifier (id).
     *
     * @param id The unique identifier of the Person to retrieve.
     * @return An Optional containing the Person entity with the given id, if found.
     */
    public Optional<Person> findById(Integer id) {
        return personRepository.findById(id);
    }

    /**
     * Save a Person entity to the database.
     *
     * @param person The Person entity to be saved.
     * @return The saved Person entity.
     */
    public Person save(Person person) {
        return personRepository.save(person);
    }

    /**
     * Delete a Person entity from the database.
     *
     * @param person The Person entity to be deleted.
     */
    public void delete(Person person) {
        personRepository.delete(person);
    }

    // Example of additional business logic
    // This method could represent custom business logic to filter, modify, or process persons in a specific way.
    // public List<Person> findPersonsBySomeCriteria() {
    //     // Implement custom logic here
    //     return new ArrayList<>();
    // }
}
