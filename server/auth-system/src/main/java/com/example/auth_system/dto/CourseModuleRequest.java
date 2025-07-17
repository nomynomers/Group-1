package com.example.auth_system.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseModuleRequest {
    private int courseID;

    @NotBlank(message = "Module name cannot be blank")
    private String moduleName;

    private String description;

    @Min(value = 1, message = "Duration must be at least 1 minute")
    private int durationMinutes;

    private String content;

    private String videoUrl;

    @Min(value = 1)
    private int moduleOrder;
}
