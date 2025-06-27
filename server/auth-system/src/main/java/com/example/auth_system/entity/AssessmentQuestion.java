package com.example.auth_system.entity;

import jakarta.persistence.*;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "AssessmentQuestions")
public class AssessmentQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer questionID;

    private Integer assessmentID;

    @Column(columnDefinition = "text")
    private String questionText;

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY)
    private List<QuestionOption> options;

    // getters/setters
}
