package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class UserCourseProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer progressID;

    @Column(name = "enroll_id")
    private Integer enrollId;
    private Integer moduleID;
    private Boolean completionStatus;
    private LocalDateTime completionDate;
}

