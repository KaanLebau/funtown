package com.funtown.application.model.api;

import com.funtown.application.enums.Status;

public record UpdateStatusRequest(
        Integer id,

        Status status
) {
}
