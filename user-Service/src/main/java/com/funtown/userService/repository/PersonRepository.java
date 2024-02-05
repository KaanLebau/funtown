package com.funtown.userService.repository;

import com.funtown.userService.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Integer> {
    // Custom query methods can be defined here
}
