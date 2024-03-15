package com.funtown.userService.service;

import com.funtown.userService.Dtos.FullPersonDto;
import com.funtown.userService.Dtos.PersonDto;
import com.funtown.userService.model.Person;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

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
     * Loads a user by their username.
     *
     * <p>This method retrieves a {@link UserDetails} object representing a user based on their username.</p>
     *
     * @param username the username of the user to load.
     * @return a {@link UserDetails} object representing the loaded user.
     * @throws UsernameNotFoundException if the user with the given username is not found.
     */
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

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
     * Deletes a person from the database based on their ID.
     *
     * @param id The ID of the person to delete.
     * @return true if the person is successfully deleted, false otherwise.
     */
    boolean deletePerson(Integer id);

    /**
     * Updates a person with the given ID in the database.
     *
     * @param id            The ID of the person to update.
     * @param personDetails The {@link Person} object containing the updated details.
     * @return A {@link Person} object representing the updated person if the update was successful,
     *         or null if the person is not found in the database.
     */
    Person updatePerson(Integer id, Person personDetails);
    Person findByUsername(String username) throws UsernameNotFoundException;
}