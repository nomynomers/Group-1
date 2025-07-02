package com.example.auth_system.controller;

import com.example.auth_system.config.UserPrincipal;
import com.example.auth_system.dto.*;
import com.example.auth_system.entity.Appointment;
import com.example.auth_system.service.AppointmentService;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

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

    @GetMapping("/my")
    public ResponseEntity<List<AppointmentResponse>> getMyAppointments(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        int userId = Integer.parseInt(userPrincipal.getId());
        List<AppointmentResponse> appointments = appointmentService.getAppointmentsByUser(userId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/check-availability")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> checkConsultantAvailability(
            @RequestParam int consultantId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam String time // 
    ) {
        try {
            LocalTime parsedTime = LocalTime.parse(time); // tự parse
            boolean available = appointmentService.isConsultantAvailable(consultantId, date, parsedTime);
            return ResponseEntity.ok(new AvailabilityResponse(available, available ? "Available" : "Not available"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid time format. Expected format: HH:mm:ss"));
        }
    }
}
