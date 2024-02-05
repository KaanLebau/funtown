package com.funtown.userService.model;

import com.funtown.userService.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 255, nullable = true)
    private String name;

    @Column(length = 255, nullable = true)
    private String surname;

    @Column(length = 255, nullable = false, unique = true)
    private String pnr;

    @Column(length = 255, nullable = false, unique = true)
    private String email;

    @Column(length = 255, nullable = true)
    private String password;

    @Column(nullable = true)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(length = 255, nullable = true)
    private String username;
}
