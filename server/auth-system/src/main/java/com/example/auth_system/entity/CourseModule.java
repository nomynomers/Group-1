package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "CourseModules")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseModule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int moduleID;

    private int courseID;

    private String moduleName;

    private String description;

    private int durationMinutes;

    private String content;

    private String videoUrl;

    private int moduleOrder;
}
