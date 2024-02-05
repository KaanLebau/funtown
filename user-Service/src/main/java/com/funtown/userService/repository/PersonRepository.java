package com.funtown.userService.repository;

import com.funtown.userService.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Integer> {
    List<Person> findByName(String name);
    Optional<Person> findByEmail(String email);
}
