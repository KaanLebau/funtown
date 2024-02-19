package com.funtown.userService.Enums;

import com.funtown.userService.enums.Role;
import org.junit.jupiter.api.Test;

import java.util.EnumSet;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class RoleTest {

    @Test
    public void testEnumValuesExist() {
        // Verify that all expected roles are present in the enum
        assertTrue(EnumSet.of(Role.ADMIN, Role.RECRUITER, Role.APPLICANT).equals(EnumSet.allOf(Role.class)),
                "Role enum does not contain the expected values.");
    }
}
