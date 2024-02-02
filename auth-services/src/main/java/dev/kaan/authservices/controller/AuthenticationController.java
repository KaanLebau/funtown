package dev.kaan.authservices.controller;

import dev.kaan.authservices.model.AuthenticationRequest;
import dev.kaan.authservices.model.Person;
import dev.kaan.authservices.security.AuthenticationResponse;
//import dev.kaan.authservices.services.AuthenticationService;
import dev.kaan.authservices.services.impl.AuthenticationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationServiceImpl authenticationService;

    @PostMapping("/registration")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody Person request) throws Exception {
        return ResponseEntity.ok(authenticationService.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticte(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.authenticate(request));

    }
}
