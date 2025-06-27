package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "CourseEvaluations")
public class CourseEvaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer evaluationID;

    private Integer courseID;
    private Integer userID;
    private Integer rating;
    private String comments;
    private LocalDateTime submissionDate;

}