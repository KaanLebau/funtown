package dev.kaan.authservices.services;

import dev.kaan.authservices.model.AuthenticationRequest;
import dev.kaan.authservices.model.Person;
import dev.kaan.authservices.security.AuthenticationResponse;

public interface AuthenticationService {

    AuthenticationResponse register(Person person) throws Exception;

    AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);

}
