package com.funtown.userService.Dtos;

import com.funtown.userService.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The PersonDto class is a data transfer object that represents person information.
 * It contains the following properties:
 * - id: The ID of the person.
 * - name: The name of the person.
 * - surname: The surname of the person.
 * - email: The email of the person.
 * - role: The role of the person.
 * - username: The username of the person.
 *
 * The PersonDto class provides getters and setters for the properties, as well as constructors for creating instances.
 * It also supports lombok annotations such as @Data, @NoArgsConstructor, @AllArgsConstructor, and @Builder for simplified code generation.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonDto {
    private Integer id;

    private String name;

    private String surname;

//    private String pnr;

    private String email;

//    private String password;

    private Role role;

    private String username;
}
