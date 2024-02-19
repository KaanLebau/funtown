package com.funtown.userService.model;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class CompetenceTest {

    private Competence competence;

    @BeforeEach
    public void setUp() {
        // Initialize a default competence for reuse in tests
        competence = new Competence();
    }

    @Test
    public void testCompetenceBuilder() {
        // Use builder to create a competence instance
        Competence builtCompetence = Competence.builder()
                .id(1)
                .name("Technical Skill")
                .build();

        assertEquals(1, builtCompetence.getId());
        assertEquals("Technical Skill", builtCompetence.getName());
    }

    @Test
    public void testSettersAndGetters() {
        // Use setters
        competence.setId(2);
        competence.setName("Leadership");

        // Validate getters
        assertEquals(2, competence.getId());
        assertEquals("Leadership", competence.getName());
    }

    @Test
    public void testNoArgsConstructor() {
        // No-args constructor is implicitly tested in setUp
        assertNotNull(competence);
        competence.setId(3);
        competence.setName("Communication");

        assertEquals(3, competence.getId());
        assertEquals("Communication", competence.getName());
    }

    @Test
    public void testAllArgsConstructor() {
        // Directly use all-args constructor
        Competence allArgsConstructorCompetence = new Competence(4, "Teamwork");

        assertEquals(4, allArgsConstructorCompetence.getId());
        assertEquals("Teamwork", allArgsConstructorCompetence.getName());
    }
}
