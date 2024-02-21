package com.funtown.userService.Enums;

import com.funtown.userService.enums.Role;
import org.junit.jupiter.api.Test;

import java.util.EnumSet;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test class for the {@link Role} enum.
 * Verifies the presence and correctness of enum values representing different user roles within the system.
 */
public class RoleTest {

    /**
     * Tests that all expected enum values exist within the {@link Role} enum.
     * Ensures that the enum contains the specific roles expected by the application,
     * thereby verifying the integrity of role definitions.
     */
    @Test
    public void testEnumValuesExist() {
        // Verify that all expected roles are present in the enum
        assertTrue(EnumSet.of(Role.ADMIN, Role.RECRUITER, Role.APPLICANT).equals(EnumSet.allOf(Role.class)),
                "Role enum does not contain the expected values.");
    }
}
