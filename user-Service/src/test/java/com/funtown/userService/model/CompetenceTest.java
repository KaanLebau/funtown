package com.funtown.userService.model;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Test class for {@link Competence}.
 * Contains unit tests to verify the functionality of the Competence class,
 * including builder pattern usage, setter and getter methods, and constructor behavior.
 */
public class CompetenceTest {

    private Competence competence;

    /**
     * Sets up the testing environment before each test.
     * Initializes a {@link Competence} instance for use in subsequent tests,
     * ensuring a fresh state for each test case.
     */
    @BeforeEach
    public void setUp() {
        // Initialize a default competence for reuse in tests
        competence = new Competence();
    }

    /**
     * Tests the builder pattern implementation of the {@link Competence} class.
     * Verifies that the builder correctly assigns and constructs a Competence instance with specified attributes.
     */
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

    /**
     * Tests the setter and getter methods of the {@link Competence} class.
     * Ensures that properties can be correctly assigned and retrieved using these methods.
     */
    @Test
    public void testSettersAndGetters() {
        // Use setters
        competence.setId(2);
        competence.setName("Leadership");

        // Validate getters
        assertEquals(2, competence.getId());
        assertEquals("Leadership", competence.getName());
    }

    /**
     * Tests the no-argument constructor of the {@link Competence} class.
     * Implicitly verifies that an instance can be created and modified, indicating the constructor's proper function.
     */
    @Test
    public void testNoArgsConstructor() {
        // No-args constructor is implicitly tested in setUp
        assertNotNull(competence);
        competence.setId(3);
        competence.setName("Communication");

        assertEquals(3, competence.getId());
        assertEquals("Communication", competence.getName());
    }

    /**
     * Tests the all-arguments constructor of the {@link Competence} class.
     * Checks that a Competence instance can be directly instantiated with initial values for all properties.
     */
    @Test
    public void testAllArgsConstructor() {
        // Directly use all-args constructor
        Competence allArgsConstructorCompetence = new Competence(4, "Teamwork");

        assertEquals(4, allArgsConstructorCompetence.getId());
        assertEquals("Teamwork", allArgsConstructorCompetence.getName());
    }
}
