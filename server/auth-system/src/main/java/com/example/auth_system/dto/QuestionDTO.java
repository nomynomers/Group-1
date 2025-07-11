package com.example.auth_system.dto;

import java.util.List;

public class QuestionDTO {
    public Integer questionID;
    public String questionText;
    public List<OptionDTO> options;
    public Integer questionOrder;
    public Boolean isInitialQuestion;
}
