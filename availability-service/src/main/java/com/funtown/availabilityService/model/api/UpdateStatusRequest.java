package com.funtown.availabilityService.model.api;

import com.funtown.availabilityService.enums.Status;

public record UpdateStatusRequest(
        Integer id,

        Status status
) {
}
