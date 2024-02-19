package com.funtown.userService.service;

import com.funtown.userService.Dtos.FullPersonDto;
import com.funtown.userService.Dtos.PersonDto;
import com.funtown.userService.model.Person;
import java.util.List;
import java.util.Optional;

public interface PersonService {

    List<PersonDto> findAll();

    FullPersonDto findById(Integer id) throws Exception;

    Person save(Person person);

    void delete(Person person);

    // Include any additional methods that your application requires.
}

