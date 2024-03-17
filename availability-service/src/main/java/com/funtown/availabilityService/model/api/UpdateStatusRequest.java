package com.funtown.availabilityService.model.api;

import com.funtown.availabilityService.enums.Status;

/**
 * The {@code UpdateStatusRequest} class represents a request to update the status of an availability.
 * It contains the availability ID and the new status.
 */
public record UpdateStatusRequest(
        Integer id,

        Status status
) {
}
