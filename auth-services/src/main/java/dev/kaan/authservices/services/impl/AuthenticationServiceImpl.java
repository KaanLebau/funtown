package dev.kaan.authservices.services.impl;

import dev.kaan.authservices.model.AuthenticationRequest;
import dev.kaan.authservices.model.Person;
import dev.kaan.authservices.model.Role;
import dev.kaan.authservices.repository.PersonRepository;
import dev.kaan.authservices.security.AuthenticationResponse;
import dev.kaan.authservices.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
private final PersonServiceImpl personService;
private final PasswordEncoder passwordEncoder;
private final JwtServiceImpl jwtService;
private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(Person person) throws Exception {
        Person client = Person.builder()
                .name(person.getName())
                .surename(person.getSurename())
                .username(person.getUsername())
                .password(passwordEncoder.encode(person.getPassword()))
                .role(Role.APPLICANT)
                .build();
        personService.create(client);
        String jwtToken = jwtService.generateToken(client);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(jwtToken)
            .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        try{
            Person client = personService.findByUsername(authenticationRequest.getUsername());
            String jwtToken = jwtService.generateToken(client);
            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(jwtToken)
                    .build();
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Username not found");
        }
    }
}
