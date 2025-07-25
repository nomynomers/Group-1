package com.example.auth_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConsultantDTO {
    private String name;
    private String specialization;
    private String imageCover;
    private String description;
}

