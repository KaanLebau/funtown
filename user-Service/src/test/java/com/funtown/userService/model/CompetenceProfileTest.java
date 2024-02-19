package com.funtown.userService.model;

import com.funtown.userService.enums.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.util.Collections;
import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test class for {@link CompetenceProfile}.
 * Contains unit tests to ensure the correctness of the CompetenceProfile's properties
 * and its association with the Person class.
 */
public class CompetenceProfileTest {
    private CompetenceProfile competenceProfile;
    private Person person;

    /**
     * Sets up the test environment before each test method.
     * Initializes a {@link CompetenceProfile} instance and associates it with a {@link Person} instance
     * to test the functionalities and associations within the CompetenceProfile class.
     */
    @BeforeEach
    public void setUp() {
        person = Person.builder()
                .id(1)
                .name("John")
                .surname("Doe")
                .pnr("123456789")
                .email("john.doe@example.com")
                .password("password")
                .role(Role.USER)
                .username("johndoe")
                .competenceProfiles(Collections.emptyList())
                .build();

        competenceProfile = CompetenceProfile.builder()
                .competenceProfileId(1)
                .competenceId(1)
                .yearsOfExperience(new BigDecimal("5.00"))
                .person(person)
                .build();
    }

    /**
     * Tests the setter and getter for the competenceProfileId property.
     * Verifies that the competenceProfileId can be correctly set and retrieved.
     */
    @Test
    public void testCompetenceProfileId() {
        Integer expectedId = 2;
        competenceProfile.setCompetenceProfileId(expectedId);
        assertEquals(expectedId, competenceProfile.getCompetenceProfileId());
    }

    /**
     * Tests the setter and getter for the competenceId property.
     * Ensures that the competenceId is accurately set and fetched.
     */
    @Test
    public void testCompetenceId() {
        Integer expectedCompetenceId = 2;
        competenceProfile.setCompetenceId(expectedCompetenceId);
        assertEquals(expectedCompetenceId, competenceProfile.getCompetenceId());
    }

    /**
     * Tests the setter and getter for the yearsOfExperience property.
     * Confirms that the years of experience can be effectively set and obtained.
     */
    @Test
    public void testYearsOfExperience() {
        BigDecimal expectedYears = new BigDecimal("10.00");
        competenceProfile.setYearsOfExperience(expectedYears);
        assertEquals(expectedYears, competenceProfile.getYearsOfExperience());
    }

    /**
     * Tests the association between {@link CompetenceProfile} and {@link Person}.
     * Verifies that a CompetenceProfile can be correctly associated with a Person,
     * and that the association reflects accurately when a different Person is set.
     */
    @Test
    public void testPersonAssociation() {
        // Assuming there's another person for the purpose of this test
        Person anotherPerson = new Person();
        anotherPerson.setId(2); // Different person ID
        competenceProfile.setPerson(anotherPerson);

        assertEquals(anotherPerson, competenceProfile.getPerson());
        assertEquals(2, competenceProfile.getPerson().getId());
    }
}
