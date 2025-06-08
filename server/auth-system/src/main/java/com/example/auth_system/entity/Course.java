package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Course")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseID;

    private int evaluationID;

    private int moduleID;

    private String courseName;

    private String description;

    private String targetAudience;

    private int durationMinutes;

    private int createdBy;

    private LocalDateTime creationDate;

    private boolean certificateAvailable;
}
