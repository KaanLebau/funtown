package com.funtown.userService.model;

import com.funtown.userService.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.time.LocalDate;
/**
 * The Person class represents an entity for storing information about individuals in a user service application.
 * It is used to model a person's attributes such as their name, surname, personal identification number (pnr),
 * email, password, role, and username.
 *
 * This class is annotated with JPA annotations to define its mapping to a database table named "person".
 *
 * @Entity indicates that this class is an entity and can be managed by JPA.
 * @Table(name = "person") specifies the name of the database table to which this entity is mapped.
 *
 * The class uses Lombok annotations for generating getter and setter methods, constructors, and the builder pattern.
 *
 * @Data annotation generates getter and setter methods for all the class fields.
 * @AllArgsConstructor generates a constructor with all fields as arguments.
 * @NoArgsConstructor generates a default constructor with no arguments.
 * @Builder generates a builder pattern for creating instances of this class.
 */
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

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<CompetenceProfile> competenceProfiles;
}
