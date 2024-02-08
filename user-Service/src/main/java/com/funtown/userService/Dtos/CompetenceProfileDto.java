package com.funtown.userService.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompetenceProfileDto {

    private Integer competence_id;
    private BigDecimal yearsOfExperience;
    private Integer person_id;
}
