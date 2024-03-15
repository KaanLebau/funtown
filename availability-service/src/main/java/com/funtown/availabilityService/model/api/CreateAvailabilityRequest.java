package com.funtown.availabilityService.model.api;

import com.funtown.availabilityService.enums.Status;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;


public record CreateAvailabilityRequest (
        String username,

        /**
         * The start date of the availability period.
         */

        String fromDate,

        /**
         * The end date of the availability period.
         */

        String toDate,


        /**
         * The status of the availability period (accepted, rejected, or unhandled).
         */
        String status,

        /**
         * The name of the recruiter associated with this availability period.
         */
        String contact,

        /**
         * The job position role once the availability is accepted.
         */
        String position
)

{
}
