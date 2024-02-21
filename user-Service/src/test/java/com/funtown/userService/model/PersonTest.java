package com.funtown.userService.model;

import com.funtown.userService.enums.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for {@link Person}.
 * This class contains unit tests to verify the behavior and associations of the Person class,
 * including the handling of competence profiles and basic field validation.
 */
public class PersonTest {

    @ParameterizedTest
    @EnumSource(Role.class)
    public void testPersonFields(Role role) {
        CompetenceProfile competenceProfile = CompetenceProfile.builder()
                .competenceId(1)
                .yearsOfExperience(new BigDecimal("3.5"))
                .build();

        Person person = Person.builder()
                .id(1)
                .name("John")
                .surname("Doe")
                .pnr("123456789")
                .email("john.doe@example.com")
                .password("password")
                .role(role)
                .username("johndoe")
                .competenceProfiles(Collections.singletonList(competenceProfile))
                .build();

        competenceProfile.setPerson(person);

        // Your assertions here:
        assertEquals(Integer.valueOf(1), person.getId());
        assertEquals("John", person.getName());
        assertEquals("Doe", person.getSurname());
        assertEquals("123456789", person.getPnr());
        assertEquals("john.doe@example.com", person.getEmail());
        assertEquals("password", person.getPassword());
        assertEquals(role, person.getRole()); // Here we're checking the assigned role
        assertEquals("johndoe", person.getUsername());
        assertNotNull(person.getCompetenceProfiles());
        assertFalse(person.getCompetenceProfiles().isEmpty());

        CompetenceProfile competenceProfileFromPerson = person.getCompetenceProfiles().get(0);
        assertEquals(person, competenceProfileFromPerson.getPerson());
        assertEquals(Integer.valueOf(1), competenceProfileFromPerson.getCompetenceId());
        assertEquals(new BigDecimal("3.5"), competenceProfileFromPerson.getYearsOfExperience());
    }
}