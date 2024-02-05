package dev.kaan.authservices.repository;

import dev.kaan.authservices.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * <p>The ClientRepository interface serves as an abstraction layer for managing interactions with the persistence layer
 *
 * concerning Client entities within the application. Extending JpaRepository grants this interface access to a wide range
 *
 * of predefined CRUD (Create, Read, Update, Delete) operations for Client entities, thereby streamlining data access
 *
 * and manipulation tasks.
 *</p>
 * Leveraging Spring Data JPA's powerful query derivation mechanism, the findByUsername method signature follows a convention
 *
 * that dynamically generates database queries based on the method name. This eliminates the need for developers to write
 *
 * boilerplate SQL or JPQL queries manually, enhancing productivity and reducing the risk of errors.
 *
 * @see org.springframework.data.jpa.repository.JpaRepository
 */
public interface ClientRepository extends JpaRepository<Client, Integer> {

    /**
     * Method to find a user by username<br>
     * accepts username type String returns Client type Optional<Client>
     * @param username search parameter
     * @return Optional
     */
    Optional<Client> findByUsername(String username);
}
