package com.example.auth_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class EnrolledCourseDTO {
    private int courseID;
    private String courseName;
    private String description;
    private String imageCover;
    private int progressPercentage;
    private LocalDateTime completeDate;
}
