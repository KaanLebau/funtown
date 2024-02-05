package dev.kaan.authservices.services;

import dev.kaan.authservices.model.AuthenticationRequest;
import dev.kaan.authservices.model.Client;
import dev.kaan.authservices.model.AuthenticationResponse;

public interface AuthenticationService {

    AuthenticationResponse register(Client client) throws Exception;

    AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);

}
