package com.funtown.userService.repository;

import com.funtown.userService.model.Competence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompetenceRepository extends JpaRepository<Competence, Integer> {
    Optional<Competence> findById(Integer integer);

}
