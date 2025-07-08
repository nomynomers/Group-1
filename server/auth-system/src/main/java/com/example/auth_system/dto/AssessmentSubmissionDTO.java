package com.example.auth_system.dto;

import java.util.List;

public class AssessmentSubmissionDTO {
    public Integer assessmentID;
    public List<AnswerDTO> answers;

    public static class AnswerDTO {
        public Integer questionID;
        public Integer optionID;
    }
}

