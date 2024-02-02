package dev.kaan.authservices.services.impl;

import dev.kaan.authservices.model.Person;
import dev.kaan.authservices.repository.PersonRepository;
import dev.kaan.authservices.services.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return personRepository.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
    }

    @Override
    public Person create(Person person) throws Exception {
        Person client = null;
        try{
            client =  personRepository.save(person);
        } catch (Exception e){
            throw new Exception("Not created!");
        }
        return  client;
    }

    @Override
    public Person findByUsername(String username) throws UsernameNotFoundException{
        return personRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("Username not found"));
    }
}
