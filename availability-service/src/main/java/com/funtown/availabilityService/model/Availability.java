package com.funtown.availabilityService.model;

import com.funtown.availabilityService.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
/**
 * Represents a job applicant's availability period for work.
 * Each availability period includes the applicant's details, such as the person ID,
 * name, availability period (fromDate to toDate), status, recruiter contact information,
 * and the job position role once the availability is accepted.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "availability")
public class Availability {

    /**
     * The unique identifier for the availability record.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * The username of the person associated with this availability.
     */
    @Column(nullable = true)
    private String username;

    /**
     * The start date of the availability period.
     */
    @Column(nullable = false)
    private LocalDate fromDate;

    /**
     * The end date of the availability period.
     */
    @Column(nullable = false)
    private LocalDate toDate;


    /**
     * The status of the availability period (accepted, rejected, or unhandled).
     */
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(nullable = false)
    private String fullname;

    /**
     * The name of the recruiter associated with this availability period.
     */
    private String contact;

    /**
     * The job position role once the availability is accepted.
     */
    private String position;
}
