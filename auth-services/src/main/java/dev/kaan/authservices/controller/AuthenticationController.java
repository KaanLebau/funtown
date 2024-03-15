package dev.kaan.authservices.controller;

import dev.kaan.authservices.model.AuthenticationRequest;
import dev.kaan.authservices.model.Client;
import dev.kaan.authservices.model.AuthenticationResponse;
//import dev.kaan.authservices.services.AuthenticationService;
import dev.kaan.authservices.services.impl.AuthenticationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
/**
 * The AuthenticationController class provides the API endpoints for user registration and authentication.
 */
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationServiceImpl authenticationService;

    @PostMapping("/registration")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody Client request) throws Exception {
        System.out.println("TRY TO REGISTER");
        return ResponseEntity.ok(authenticationService.register(request));
    }

    /**
     *<b>Description: </b> User login
     *<br>
     *<b>Auth level: </b> Public
     *<br>
     *<b>RequestBody: </b> should have the following structure
     *<pre>
     *  {
     *      <b>username: </b> "This key contains String value",
     *      <b>password: </b> "This key contains String value",
     *  }
     *</pre>
     *<br>
     * <b>Response: </b> should have the following structure
     * <pre>
     *     {
     *
     *     }
     * </pre>
     * @param request
     * @return Jwt-Object
     */
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticte(@RequestBody AuthenticationRequest request){
        System.out.println("TRY TO AUTHENTICATE");
        try{
            return ResponseEntity.ok(authenticationService.authenticate(request));
        } catch (UsernameNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * This method returns a string representing the text "Registration page test".
     *
     * @return the string "Registration page test"
     */
    @GetMapping("/registration")
    public String regTest(){
        return "Registration page test";
    }
}
