package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "Consultants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Consultant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consultantID")
    private int consultantId;

    @Column(name = "specialization")
    private String specialization;

    @Column(name = "qualification")
    private String qualification;

    @Column(name = "yearsExperience")
    private int yearsExperience;

    @OneToMany(mappedBy = "consultant")
    private Set<Appointment> appointments;
}