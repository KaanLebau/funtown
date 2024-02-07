package dev.kaan.authservices.services;

import dev.kaan.authservices.model.Client;
import dev.kaan.authservices.services.impl.ClientServiceImpl;
import org.springframework.security.core.userdetails.UserDetailsService;


/**
 * The ClientService interface defines a contract for managing person-related operations.
 * By abstracting these operations into an interface, it emphasizes polymorphism and
 * establishes a clear contract to be followed by implementing classes.
 * All implementations of ClientService are located in the sub-package "./impl/".
 *
 * <p>
 * The main implementation class for ClientService is {@link ClientServiceImpl}.
 * </p>
 *
 * <p>
 * This interface extends UserDetailsServices, indicating that it provides additional
 * services related to user details.
 * </p>
 *
 * <p>
 *  The {@code create} method is used to create a new person entity. It accepts a {@link Client} object as a parameter
 *   and returns the created entity. If an exception occurs during the creation process, it is propagated.
 *   </p>
 *
 *   <p>
 *  The {@code findByUsername} method retrieves a person entity based on the provided username. If a person with the
 *  specified username is found, it returns the corresponding {@link Client} object; otherwise, it returns {@code null}.
 *   </p>
 * @see org.springframework.security.core.userdetails.UserDetailsService
 * @author Kaan
 */

public interface ClientService extends UserDetailsService {
    /**
     * Creates a new client entity.
     *
     * Example usage of the {@code create} method:
     * <pre>{@code
     *          ClientServiceImpl personServiceImpl (injected)
     *          Client client = Client
     *              .builder()
     *              .name("John")
     *              .surname("Doe")
     *              .username("johndoe")
     *              .password("password123")
     *              .build();
     *          Client createdPerson = personServiceImpl.create(client);
     *   }</pre>
     *
     * @param client The {@link Client} object to be created.
     * @return The created {@link Client} entity.
     * @throws Exception If an error occurs during the creation process.
     */
    Client create(Client client) throws Exception;
    /**
     * Retrieves a person entity based on the provided username.
     *
     * @param username The username of the person to retrieve.
     * @return The {@link Client} object corresponding to the username,
     *         or {@code null} if not found.
     */
    Client findByUsername(String username);

}
