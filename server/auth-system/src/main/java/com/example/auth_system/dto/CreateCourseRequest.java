package com.example.auth_system.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCourseRequest {
    @NotBlank(message = "Course Name can not blank!")
    private String courseName;

    @NotBlank()
    private String description;

    @NotBlank()
    private String targetAudience;

    @NotBlank()
    private int durationMinutes;
    
    private int createdBy;

    @NotBlank()
    private boolean certificateAvailable;

    private String imageCover;

    @NotBlank()
    private String author;
}
