package com.example.auth_system.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
    @PrePersist
    public void prePersist() {
        if (creationDate == null) {
            creationDate = LocalDateTime.now();
        }
    }

    private boolean certificateAvailable;

    private String imageCover;

    private String author;
}
