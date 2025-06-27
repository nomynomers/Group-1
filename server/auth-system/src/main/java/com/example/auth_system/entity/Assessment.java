package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Assessments")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int assessmentID;

    private String assessmentName;

    @Column(columnDefinition = "text")
    private String description;

    private String targetAudience;

    private Integer estimatedTimeMinutes;

    private LocalDateTime createdDate;

    private String imageCover;
}
