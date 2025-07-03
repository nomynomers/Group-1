package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentID;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "consultantID", nullable = false)
    private Consultant consultant;

    private LocalDate appointmentDate;
    @Column(name = "startTime", columnDefinition = "TIME")
    private LocalTime startTime;
    private LocalTime endTime;
    private String status;
    private String meetingLink;
}

