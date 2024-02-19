package com.funtown.userService.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * CompetenceProfileDto represents a data transfer object for competence profile information.
 * The class contains the following properties:
 *
 * competence_id - The ID of the competence.
 * yearsOfExperience - The number of years of experience in the competence.
 * person_id - The ID of the person associated with the competence profile.
 *
 * The CompetenceProfileDto class provides getters and setters for the properties, as well as constructors for creating instances.
 * It also supports lombok annotations such as @Data, @NoArgsConstructor, @AllArgsConstructor and @Builder for simplified code generation.
 *
 * Usage Example:
 *
 * FullPersonDto fullPersonDto = FullPersonDto.builder()
 *                                           .id(1)
 *                                           .name("John")
 *                                           .surname("Doe")
 *                                           .email("john.doe@example.com")
 *                                           .role(Role.APPLICANT)
 *                                           .username("johndoe")
 *                                           .competenceProfiles(new ArrayList<>())
 *                                           .build();
 *
 * CompetenceProfileDto competenceProfileDto = CompetenceProfileDto.builder()
 *                                                                 .competence_id(1)
 *                                                                 .yearsOfExperience(new BigDecimal("5.5"))
 *                                                                 .person_id(1)
 *                                                                 .build();
 *
 * fullPersonDto.getCompetenceProfiles().add(competenceProfileDto);
 *
 * Note: The Role enum declaration is used in the example code.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompetenceProfileDto {

    private Integer competence_id;
    private BigDecimal yearsOfExperience;
    private Integer person_id;
}
