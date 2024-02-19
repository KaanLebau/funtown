package com.funtown.userService.model;
import com.funtown.userService.enums.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.util.Collections;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CompetenceProfileTest {
    private CompetenceProfile competenceProfile;
    private Person person;

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

    @Test
    public void testCompetenceProfileId() {
        Integer expectedId = 2;
        competenceProfile.setCompetenceProfileId(expectedId);
        assertEquals(expectedId, competenceProfile.getCompetenceProfileId());
    }

    @Test
    public void testCompetenceId() {
        Integer expectedCompetenceId = 2;
        competenceProfile.setCompetenceId(expectedCompetenceId);
        assertEquals(expectedCompetenceId, competenceProfile.getCompetenceId());
    }

    @Test
    public void testYearsOfExperience() {
        BigDecimal expectedYears = new BigDecimal("10.00");
        competenceProfile.setYearsOfExperience(expectedYears);
        assertEquals(expectedYears, competenceProfile.getYearsOfExperience());
    }

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
