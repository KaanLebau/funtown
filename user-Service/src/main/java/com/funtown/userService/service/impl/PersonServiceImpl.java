package com.funtown.userService.service.impl;

import com.funtown.userService.Dtos.FullPersonDto;
import com.funtown.userService.Dtos.PersonDto;
import com.funtown.userService.model.Person;
import com.funtown.userService.repository.PersonRepository;
import com.funtown.userService.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Service implementation for managing persons.
 * Implements {@link PersonService} to provide CRUD operations for {@link Person} entities.
 */
@Service
@RequiredArgsConstructor

public class PersonServiceImpl implements PersonService, UserDetailsService {

    private final PersonRepository personRepository;

    private final ModelMapper mapper;
    /**
     * Retrieves the user details for the given username.
     *
     * @param username The username of the user.
     * @return The UserDetails object representing the user with the given username.
     * @throws UsernameNotFoundException If the user is not found or the username/password are null.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person person = personRepository.findByUsername(username);

        // check if person doesn't exist or username/password are null
        if (person == null || person.getUsername() == null || person.getPassword() == null) {
            throw new UsernameNotFoundException("Not found: " + username);
        }

        // use the role of the actual person
        return User.withUsername(person.getUsername())
                .password(person.getPassword())
                .roles(person.getRole().name())
                .build();
    }

    /**
     * Retrieves all persons stored in the database.
     *
     * @return A list of {@link Person} instances, which may be empty if no persons are found.
     */
    @Override
    public List<PersonDto> findAll() {
        return personRepository.findAll().stream().map(
                (person) -> {
                    return mapper.map(person, PersonDto.class);
                }
        ).toList();

    }

    /**
     * Retrieves a person by their ID.
     *
     * @param id The ID of the person to retrieve.
     * @return An {@link Optional} containing the found {@link Person} or empty if no person is found with the given ID.
     */
    @Override
    public FullPersonDto findById(Integer id) throws Exception{
        Person person = personRepository.findById(id).orElseThrow(
                () -> new Exception("Person dosen't exit")
        );
        return mapper.map(person, FullPersonDto.class);
    }

    /**
     * Saves a given person to the database.
     * This method is used for both creating a new person and updating an existing one.
     *
     * @param person The {@link Person} to save.
     * @return The saved {@link Person} instance, now with an ID if it was newly created.
     */
    @Override
    public Person save(Person person) {
        return personRepository.save(person);
    }


    /**
     * Deletes a person from the database by their ID.
     *
     * @param id The ID of the person to delete.
     * @return true if the person was successfully deleted, false otherwise.
     */
    @Override
    public boolean deletePerson(Integer id) {
        Optional<Person> person = personRepository.findById(id);
        if (person.isPresent()) {
            personRepository.delete(person.get());
            return true;
        }
        return false;
    }

    /**
     * Update the details of a person.
     *
     * @param id The ID of the person to update.
     * @param personDetails The updated details of the person.
     * @return The updated {@link Person} instance, or null if the person with the given ID does not exist.
     */
    @Override
    public Person updatePerson(Integer id, Person personDetails) {
        Optional<Person> person = personRepository.findById(id);
        if (person.isPresent()) {
            Person existingPerson = person.get();
            existingPerson.setName(personDetails.getName());
            existingPerson.setEmail(personDetails.getEmail());
            existingPerson.setPnr(personDetails.getPnr());
            existingPerson.setUsername(personDetails.getUsername());
            // add more attributes here if needed
            return personRepository.save(existingPerson);
        }
        return null;
    }
}