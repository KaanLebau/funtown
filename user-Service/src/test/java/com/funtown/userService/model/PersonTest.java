package com.funtown.userService.model;

import com.funtown.userService.enums.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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

    private Person person;

    /**
     * Sets up the testing environment before each test.
     * Initializes a {@link Person} instance with a linked {@link CompetenceProfile}
     * to test the association between Person and CompetenceProfile.
     */
    @BeforeEach
    public void setUp() {
        // Initialize Person with a CompetenceProfile to test the association
        CompetenceProfile competenceProfile = CompetenceProfile.builder()
                .competenceId(1)
                .yearsOfExperience(new BigDecimal("3.5"))
                .build();
        person = Person.builder()
                .id(1)
                .name("John")
                .surname("Doe")
                .pnr("123456789")
                .email("john.doe@example.com")
                .password("password")
                .role(Role.USER)
                .username("johndoe")
                .competenceProfiles(Collections.singletonList(competenceProfile))
                .build();

        // Link back from CompetenceProfile to Person to mimic bi-directional relationship handling
        competenceProfile.setPerson(person);
    }

    /**
     * Tests the fields of a {@link Person} instance for correctness.
     * Verifies that each field of the Person class is correctly assigned and retrievable,
     * and that the association with {@link CompetenceProfile} is properly maintained.
     */
    @Test
    public void testPersonFields() {
        assertEquals(Integer.valueOf(1), person.getId());
        assertEquals("John", person.getName());
        assertEquals("Doe", person.getSurname());
        assertEquals("123456789", person.getPnr());
        assertEquals("john.doe@example.com", person.getEmail());
        assertEquals("password", person.getPassword());
        assertEquals(Role.USER, person.getRole());
        assertEquals("johndoe", person.getUsername());
        assertNotNull(person.getCompetenceProfiles());
        assertFalse(person.getCompetenceProfiles().isEmpty());

        CompetenceProfile competenceProfile = person.getCompetenceProfiles().get(0);
        assertEquals(person, competenceProfile.getPerson());
        assertEquals(Integer.valueOf(1), competenceProfile.getCompetenceId());
        assertEquals(new BigDecimal("3.5"), competenceProfile.getYearsOfExperience());
    }

    /**
     * Tests the association between {@link Person} and {@link CompetenceProfile} for correctness.
     * Specifically, it verifies that the competenceProfiles list within a Person object
     * correctly manages additions and reflects updates to the association.
     */
    @Test
    public void testCompetenceProfilesAssociation() {
        // Verify the competenceProfiles association works correctly
        CompetenceProfile newCompetenceProfile = new CompetenceProfile();
        newCompetenceProfile.setCompetenceId(2);
        newCompetenceProfile.setYearsOfExperience(new BigDecimal("2.0"));
        newCompetenceProfile.setPerson(person);

        person.setCompetenceProfiles(List.of(newCompetenceProfile));

        assertEquals(1, person.getCompetenceProfiles().size());
        assertTrue(person.getCompetenceProfiles().contains(newCompetenceProfile));
        assertEquals(person, person.getCompetenceProfiles().get(0).getPerson());
    }
}
