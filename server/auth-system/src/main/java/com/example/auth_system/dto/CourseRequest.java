package com.example.auth_system.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseRequest {
    @NotBlank(message = "Course Name can not blank!")
    private String courseName;

    @NotBlank()
    private String description;

    @NotBlank()
    private String targetAudience;

    @Min(value = 1, message = "Duration must be greater than 0")
    private int durationMinutes;

    private String imageCover;

    @NotBlank()
    private String author;
}
