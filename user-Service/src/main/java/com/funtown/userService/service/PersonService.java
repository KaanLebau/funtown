package com.funtown.userService.service;

import com.funtown.userService.model.Person;
import com.funtown.userService.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonService {

    private final PersonRepository personRepository;


    public List<Person> findAll() {
        return personRepository.findAll();
    }

    public Optional<Person> findById(Integer id) {
        return personRepository.findById(id);
    }

    public Person save(Person person) {
        return personRepository.save(person);
    }

    public void delete(Person person) {
        personRepository.delete(person);
    }

    // Example of additional business logic
    // This method could represent custom business logic to filter, modify, or process persons in a specific way.
    // public List<Person> findPersonsBySomeCriteria() {
    //     // Implement custom logic here
    //     return new ArrayList<>();
    // }
}
