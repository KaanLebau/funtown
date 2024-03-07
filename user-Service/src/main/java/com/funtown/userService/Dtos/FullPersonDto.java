package com.funtown.userService.Dtos;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * FullPersonDto represents a data transfer object for person information.
 * The class contains the following properties:
 *
 * id - The ID of the person.
 * name - The name of the person.
 * surname - The surname of the person.
 * email - The email of the person.
 * role - The role of the person.
 * username - The username of the person.
 * competenceProfiles - A list of competence profiles associated with the person.
 *
 * The FullPersonDto class provides getters and setters for the properties, as well as constructors for creating instances.
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
 * Note: The Role and CompetenceProfileDto class declarations are used in the example code.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FullPersonDto {
    private Integer id;

    private String firstName;

    private String lastName;

//    private String pnr;

    private String email;

//    private String password;

    private String username;

    private List<CompetenceProfileDto> competenceProfiles;
}
