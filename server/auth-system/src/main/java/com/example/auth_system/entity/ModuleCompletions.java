package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ModuleCompletions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer progressID;

    @Column(name = "enrollmentID")
    private Integer enrollId;
    private Integer moduleID;
    private Boolean completionStatus;
}

