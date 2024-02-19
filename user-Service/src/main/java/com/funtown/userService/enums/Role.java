/**
 * The Role enum represents the different roles that users can have within the user service application.
 * It defines three possible roles: ADMIN, RECRUITER, and APPLICANT.
 */
package com.funtown.userService.enums;

public enum Role {
    /**
     * Represents the role of an Administrator.
     */
    ADMIN,

    /**
     * Represents the role of a Recruiter.
     */
    RECRUITER,

    /**
     * Represents the role of an Applicant.
     */
    APPLICANT,
    /**
     * Represents a user in the system.
     *
     * The USER constant is a role within the system. It is part of the Role enum and
     * represents a generic user. The Role enum also includes specific roles such as
     * Administrator, Recruiter, and Applicant.
     */
    USER
}
