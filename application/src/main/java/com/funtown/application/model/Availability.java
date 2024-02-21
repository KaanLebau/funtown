package com.funtown.application.model;

import com.funtown.application.enums.Status;
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
@Table(name = "availability")
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private Integer personId;
    @Column(nullable = false)
    private LocalDate fromDate;
    @Column(nullable = false)
    private LocalDate toDate;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;
    private String contact;
    private String role;
}
