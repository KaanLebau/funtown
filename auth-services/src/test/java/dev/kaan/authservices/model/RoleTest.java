package dev.kaan.authservices.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RoleTest {
    @Test
    void testRecruiterRole() {

        Role role = Role.RECRUITER;

        assertEquals("RECRUITER", role.name());
        assertTrue(role.toString().contains("RECRUITER"));
    }

    @Test
    void testApplicantRole() {

        Role role = Role.APPLICANT;


        assertEquals("APPLICANT", role.name());
        assertTrue(role.toString().contains("APPLICANT"));
    }

    @Test
    void testEnumValues() {

        Role[] roles = Role.values();

        assertEquals(2, roles.length);
        assertEquals(Role.RECRUITER, roles[0]);
        assertEquals(Role.APPLICANT, roles[1]);
    }

    @Test
    void testEnumValueOf() {

        Role role = Role.valueOf("RECRUITER");

        assertEquals(Role.RECRUITER, role);
    }

}