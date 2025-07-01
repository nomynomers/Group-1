package com.example.auth_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsultantRequest {
    private int userID;
    private String specialization;
    private String qualification;
    private int yearsExperience;
    private boolean available;
    private String imageCover;
}

