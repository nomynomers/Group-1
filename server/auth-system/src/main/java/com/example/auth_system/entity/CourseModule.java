package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "CourseModule")
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
}
