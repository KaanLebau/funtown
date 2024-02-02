package com.funtown.application.repository;

import com.funtown.application.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AvailabilityRepository extends JpaRepository<Availability, Integer> {
    Optional<Availability> findByPersonId(Integer integer);
}
