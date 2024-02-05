package com.funtown.userService.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
/**
 * The CompetenceProfile class represents an entity for storing information about a person's competence profile in a user service application.
 * It is used to model attributes such as the competence profile ID, person ID, competence ID, and years of experience.
 *
 * This class is annotated with JPA annotations to define its mapping to a database table named "competence_profile".
 *
 * @Entity indicates that this class is an entity and can be managed by JPA.
 * @Table(name = "competence_profile") specifies the name of the database table to which this entity is mapped.
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
@Table(name = "competence_profile")
public class CompetenceProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer competenceProfileId;

    @Column(name = "person_id")
    private Integer personId;

    @Column(name = "competence_id")
    private Integer competenceId;

    @Column(name = "years_of_experience", precision = 4, scale = 2)
    private BigDecimal yearsOfExperience;
}
