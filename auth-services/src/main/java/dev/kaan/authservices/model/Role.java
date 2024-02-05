package dev.kaan.authservices.model;

/**
 *
 * The Role enum represents the roles that users can have within the system.
 * Each role defines a specific set of permissions and access rights.
 *
 * <p>Example usage:</p>
 * <pre>{@code
 *     Role userRole = Role.RECRUITER;
 *
 *     if (userRole == Role.RECRUITER) {
 *         // Grant additional permissions to recruiter
 *         // ...
 *     } else if (userRole == Role.APPLICANT) {
 *         // Grant permissions specific to applicants
 *         // ...
 *     }
 * }</pre>
 * @author Kaan
 */
public enum Role {
    /**
     * The RECRUITER role represents users who have permissions related to recruiting and managing job postings.
     */
    RECRUITER,
    /**
     * The APPLICANT role represents users who have permissions related to applying for job positions and managing their applications.
     */
    APPLICANT
}
