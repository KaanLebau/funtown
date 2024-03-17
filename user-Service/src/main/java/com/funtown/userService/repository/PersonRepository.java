/**
 * The PersonRepository interface is a Spring Data JPA repository interface for performing database operations
 * related to the Person entity.
 *
 * It extends JpaRepository, which provides built-in CRUD (Create, Read, Update, Delete) operations for the Person entity.
 * The generic types specify that this repository handles Person entities, and the ID type is Integer.
 *
 * This interface also defines additional custom query methods for retrieving Person entities by name and email.
 */
package com.funtown.userService.repository;

import com.funtown.userService.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {
    /**
     * Retrieve a list of persons with the specified name.
     *
     * @param firstName The name to search for.
     * @return A list of Person entities with the given name.
     */
    List<Person> findByFirstName(String firstName);

    /**
     * Retrieve a Person entity with the specified email.
     *
     * @param email The email address to search for.
     * @return An Optional containing the Person entity with the given email, if found.
     */
    Optional<Person> findByEmail(String email);
    /**
     * Retrieves a person by their ID.
     *
     * @param id The ID of the person to retrieve.
     * @return An {@link Optional} containing the found {@link Person} or empty if no person is found with the given ID.
     */
    Optional<Person> findById(Integer id);

    /**
     * Finds a {@link Person} entity by their username.
     *
     * @param username The username of the person to find.
     * @return An {@link Optional} containing the found {@link Person} entity with the given username, if found.
     */
    Optional<Person> findByUsername(String username);

}
