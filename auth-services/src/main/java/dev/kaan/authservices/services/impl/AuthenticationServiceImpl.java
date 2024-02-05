package dev.kaan.authservices.services.impl;

import dev.kaan.authservices.model.AuthenticationRequest;
import dev.kaan.authservices.model.Client;
import dev.kaan.authservices.model.Role;
import dev.kaan.authservices.model.AuthenticationResponse;
import dev.kaan.authservices.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
private final ClientServiceImpl PERSON_SERVICE;
private final PasswordEncoder PASSWORD_ENCODER;
private final JwtServiceImpl JWT_SERVICE;
private final AuthenticationManager AUTHENTICATION_MANAGER;

    @Override
    public AuthenticationResponse register(Client record) throws Exception {
        Client client = PERSON_SERVICE.create(
                Client.builder()
                    .username(record.getUsername())
                    .password(PASSWORD_ENCODER.encode(record.getPassword()))
                    .role(Role.APPLICANT)
                    .build());
        String jwtToken = JWT_SERVICE.generateToken(client);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(jwtToken)
            .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        AUTHENTICATION_MANAGER.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        try{
            Client client = PERSON_SERVICE.findByUsername(authenticationRequest.getUsername());
            String jwtToken = JWT_SERVICE.generateToken(client);
            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(jwtToken)
                    .build();
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Username not found");
        }
    }
}
