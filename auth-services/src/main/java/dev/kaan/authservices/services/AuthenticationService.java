package dev.kaan.authservices.services;

import dev.kaan.authservices.model.AuthenticationRequest;
import dev.kaan.authservices.model.Client;
import dev.kaan.authservices.model.AuthenticationResponse;

/**
 * The AuthenticationService interface provides methods for user registration and authentication.
 */
public interface AuthenticationService {

    AuthenticationResponse register(Client client) throws Exception;

    AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);

}
