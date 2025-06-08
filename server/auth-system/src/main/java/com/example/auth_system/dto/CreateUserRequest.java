package com.example.auth_system.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    private String firstName;

    private String lastName;

    private LocalDate dateOfBirth;

    private String phoneNumber;

    @NotBlank
    private String roleName;
}
