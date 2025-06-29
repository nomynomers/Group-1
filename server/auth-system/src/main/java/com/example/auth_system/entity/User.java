package com.example.auth_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Users", schema = "dbo") //  matches table name in SQL Server
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userID")
    private int userId;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "dateOfBirth")
    private LocalDate dateOfBirth;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "registrationDate", nullable = false)
    private LocalDateTime registrationDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roleID", nullable = false) //  matches FK column
    private Roles role;

    @OneToMany(mappedBy = "user")
    private List<Appointment> appointments;


    @PrePersist
    public void prePersist() {
        if (registrationDate == null) {
            registrationDate = LocalDateTime.now();
        }
    }
}

