package com.funtown.userService.service;

import com.funtown.userService.model.Person;
import java.util.List;
import java.util.Optional;

public interface IPersonService {

    List<Person> findAll();

    Optional<Person> findById(Integer id);

    Person save(Person person);

    void delete(Person person);

    // Include any additional methods that your application requires.
}
