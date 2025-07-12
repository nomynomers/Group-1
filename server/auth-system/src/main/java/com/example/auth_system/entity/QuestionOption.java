package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "QuestionOptions")
public class QuestionOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer optionID;

    private Integer score;
    
    private String optionText;

    @ManyToOne
    @JoinColumn(name = "questionID")
    private AssessmentQuestion question;

    private Integer nextQuestionID;

    private Integer optionOrder;
}