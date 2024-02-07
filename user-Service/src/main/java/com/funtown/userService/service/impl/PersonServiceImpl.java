package com.funtown.userService.service.impl;

import com.funtown.userService.model.Person;
import com.funtown.userService.repository.PersonRepository;
import com.funtown.userService.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Service implementation for managing persons.
 * Implements {@link PersonService} to provide CRUD operations for {@link Person} entities.
 */
@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;

    /**
     * Retrieves all persons stored in the database.
     *
     * @return A list of {@link Person} instances, which may be empty if no persons are found.
     */
    @Override
    public List<Person> findAll() {
        return personRepository.findAll();
    }

    /**
     * Retrieves a person by their ID.
     *
     * @param id The ID of the person to retrieve.
     * @return An {@link Optional} containing the found {@link Person} or empty if no person is found with the given ID.
     */
    @Override
    public Optional<Person> findById(Integer id) {
        return personRepository.findById(id);
    }

    /**
     * Saves a given person to the database.
     * This method is used for both creating a new person and updating an existing one.
     *
     * @param person The {@link Person} to save.
     * @return The saved {@link Person} instance, now with an ID if it was newly created.
     */
    @Override
    public Person save(Person person) {
        return personRepository.save(person);
    }

    /**
     * Deletes a given person from the database.
     *
     * @param person The {@link Person} to delete.
     */
    @Override
    public void delete(Person person) {
        personRepository.delete(person);
    }

    // Implement additional methods as per the interface definition, if any.
}
