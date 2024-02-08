package com.funtown.userService.Dtos;

import com.funtown.userService.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
