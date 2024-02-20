package com.funtown.userService.service;

import com.funtown.userService.Dtos.FullPersonDto;
import com.funtown.userService.Dtos.PersonDto;
import com.funtown.userService.model.Person;
import java.util.List;

/**
 * Service interface for managing {@link Person} entities.
 * This interface defines the operations for managing persons within the application,
 * including retrieval, creation, and deletion of person records.
 */
public interface PersonService {

    /**
     * Retrieves all persons in the application.
     *
     * @return a list of {@link PersonDto} representing all persons.
     */
    List<PersonDto> findAll();

    /**
     * Finds a single person by their identifier.
     *
     * @param id the ID of the person to find.
     * @return a {@link FullPersonDto} containing the full details of the person.
     * @throws Exception if the person cannot be found or if there's an issue accessing the data.
     */
    FullPersonDto findById(Integer id) throws Exception;

    /**
     * Saves a person entity in the application.
     * This method can be used for both creating a new person record or updating an existing one.
     *
     * @param person the {@link Person} entity to be saved.
     * @return the saved {@link Person} entity.
     */
    Person save(Person person);

    /**
     * Deletes a given person entity from the application.
     *
     * @param person the {@link Person} entity to delete.
     */
    void delete(Person person);

    // Include any additional methods that your application requires.
}
