package dev.kaan.authservices.services.impl;

import dev.kaan.authservices.model.Client;
import dev.kaan.authservices.repository.ClientRepository;
import dev.kaan.authservices.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * The ClientServiceImpl class is an implementation of the ClientService interface.
 * It provides methods for managing client-related operations, such as loading a user
 * by username, creating a client, and finding a client by username.
 *
 * <p>
 * This class is annotated with @Service, indicating that it is a service component that
 * should be detected during component scanning and registered in the application context.
 * </p>
 *
 * <p>
 * The main constructor of this class is annotated with @RequiredArgsConstructor,
 * which generates a constructor with required arguments based on the fields of the class.
 * </p>
 *
 * <p>
 * This class overrides the loadUserByUsername method from the UserDetailsService interface.
 * It queries the client repository to find a client with the given username.
 * If a client is found, it returns a UserDetails object; otherwise, it throws a UsernameNotFoundException.
 * </p>
 *
 * <p>
 * The create method accepts a Client object and attempts to save it using the client repository.
 * If the client is successfully saved, it returns the created client; otherwise, it throws an exception.
 * </p>
 *
 * <p>
 * The findByUsername method queries the client repository to find a client with the given username.
 * If a client is found, it returns the client; otherwise, it throws a UsernameNotFoundException.
 * </p>
 *
 * @see ClientService
 * @see org.springframework.security.core.userdetails.UserDetailsService
 * @author Kaan
 */
@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository CLIENT_REPOSITORY;

    /**
     * Loads a user by the given username.
     *
     * @param username The username of the user to load.
     * @return The UserDetails object representing the loaded user.
     * @throws UsernameNotFoundException If the user is not found.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return CLIENT_REPOSITORY.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
    }

    /**
     * Creates a new client and saves it to the repository.
     *
     * @param person The Client object representing the client to be created.
     * @return The created client.
     * @throws Exception If the client cannot be created.
     */
    @Override
    public Client create(Client person) throws Exception {
        Client client = null;
        try{
            client =  CLIENT_REPOSITORY.save(person);
        } catch (Exception e){
            throw new Exception("Not created!");
        }
        return  client;
    }

    /**
     * Retrieves a client by their username.
     *
     * @param username The username of the client to retrieve.
     * @return The client matching the given username.
     * @throws UsernameNotFoundException If no client with the given username is found.
     */
    @Override
    public Client findByUsername(String username) throws UsernameNotFoundException{
        System.out.println("function findByUsername called");
        Client client = null;
        try{
            System.out.println("looking for " + username);
            client = CLIENT_REPOSITORY.findByUsername(username).get();
            System.out.println("found somethink!");
        }catch (Exception e){
            System.out.println("username " + username + "is not in db");
            throw new UsernameNotFoundException("Username not found");
        }
        return client;
    }
}
