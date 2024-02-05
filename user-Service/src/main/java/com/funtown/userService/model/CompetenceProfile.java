package com.funtown.userService.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

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
