package com.funtown.userService.repository;

import com.funtown.userService.model.Competence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * The CompetenceRepository interface extends the JpaRepository interface, providing
 * methods to interact with a database and perform CRUD operations on Competence objects.
 */
public interface CompetenceRepository extends JpaRepository<Competence, Integer> {
    Optional<Competence> findById(Integer integer);

}
