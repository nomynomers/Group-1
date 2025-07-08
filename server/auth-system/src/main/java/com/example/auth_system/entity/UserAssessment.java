package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "UserAssessments")
@Getter
@Setter
public class UserAssessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userAssessmentID;

    private Integer userID;

    private Integer assessmentID;

    private LocalDateTime completionDate;

    private Integer totalScore;

    private String riskLevel;

    private String recommendationProvided;
}

