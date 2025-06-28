package com.example.auth_system.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class EvaluationDTO {
    private int evaluationID;
    private int courseID;
    private int userID;
    private int rating;
    private String comments;
    private LocalDateTime submissionDate;
    private String username;
}
