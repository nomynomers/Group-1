package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Consultants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Consultant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int consultantID;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    private String specialization;
    private String qualification;
    private int yearsExperience;
}