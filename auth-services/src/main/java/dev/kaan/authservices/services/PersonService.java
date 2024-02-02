package dev.kaan.authservices.services;

import dev.kaan.authservices.model.Person;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface PersonService extends UserDetailsService {

    Person create(Person person) throws Exception;
    Person findByUsername(String username);

}
