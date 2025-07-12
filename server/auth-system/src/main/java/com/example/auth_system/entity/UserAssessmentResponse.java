package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "UserAssessmentResponses")
@Getter
@Setter
public class UserAssessmentResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int responseID;

    @ManyToOne
    @JoinColumn(name = "userAssessmentID")
    private UserAssessment userAssessment;

    private Integer questionID;
    private Integer optionID;

    private String substance;

}
