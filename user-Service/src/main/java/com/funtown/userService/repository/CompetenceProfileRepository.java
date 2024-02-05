package com.funtown.userService.repository;

import com.funtown.userService.model.CompetenceProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompetenceProfileRepository extends JpaRepository<CompetenceProfile, Integer> {
    // Custom query methods if needed
    List<CompetenceProfile> findByPersonId(Integer personId);

    List<CompetenceProfile> findByCompetenceId(Integer competenceId);
}
