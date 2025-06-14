package com.example.auth_system.controller;

import com.example.auth_system.dto.AppointmentRequest;
import com.example.auth_system.dto.MessageResponse;
import com.example.auth_system.service.AppointmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
@RequestMapping("/api/appointments")
@RequiredArgsConstructor

public class AppointmentController {

    private final AppointmentService appointmentService;
    @PostMapping("/book")
    public ResponseEntity<?> book(@Valid @RequestBody AppointmentRequest request) {
        try {
            MessageResponse response = appointmentService.createAppointment(request);;
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}
