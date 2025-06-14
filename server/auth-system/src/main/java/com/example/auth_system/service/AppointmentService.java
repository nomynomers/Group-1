package com.example.auth_system.service;

import com.example.auth_system.dto.AppointmentRequest;
import com.example.auth_system.dto.MessageResponse;
import com.example.auth_system.entity.Appointment;
import com.example.auth_system.entity.Consultant;
import com.example.auth_system.entity.User;
import com.example.auth_system.repository.AppointmentRepository;
import com.example.auth_system.repository.ConsultantRepository;
import com.example.auth_system.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;
    private final EmailService emailService;

    /**
     * Create appointment if time slot is free.
     */
    @Transactional
    public MessageResponse createAppointment(AppointmentRequest request) {
        // Check for time conflict
        List<Appointment> conflicts = appointmentRepository.findConflictingAppointments(
                request.getConsultantID(),
                request.getAppointmentDate(),
                request.getStartTime(),
                request.getEndTime()
        );

        if (!conflicts.isEmpty()) {
            return new MessageResponse("Error: This time slot is already booked.");
        }

        // Find user and consultant
        User user = userRepository.findById(request.getUserID())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Consultant consultant = consultantRepository.findById(request.getConsultantID())
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        // Build and save appointment
        Appointment appointment = Appointment.builder()
                .user(user)
                .consultant(consultant)
                .appointmentDate(request.getAppointmentDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .build();

        appointmentRepository.save(appointment);

        // Send confirmation email
        try {
            emailService.sendAppointmentConfirmation(
                    user.getEmail(),
                    request.getAppointmentDate(),
                    request.getStartTime()
            );
        } catch (Exception e) {
            log.error("Failed to send confirmation email: {}", e.getMessage());
        }

        return new MessageResponse("Appointment booked successfully.");
    }

    /**
     * Cancel appointment by ID.
     */
    @Transactional
    public MessageResponse cancelAppointment(int appointmentID) {
        Optional<Appointment> optional = appointmentRepository.findById(appointmentID);
        if (optional.isEmpty()) {
            return new MessageResponse("Error: Appointment not found.");
        }

        appointmentRepository.deleteById(appointmentID);
        return new MessageResponse("Appointment canceled.");
    }

    /**
     * Get appointments by user ID.
     */
    public List<Appointment> getAppointmentsByUser(int userID) {
        return appointmentRepository.findByUser_UserId(userID);
    }

    /**
     * Get consultant appointments on a specific date.
     */
    public List<Appointment> getAppointmentsForConsultantOnDate(int consultantId, LocalDate date) {
        return appointmentRepository.findByConsultant_ConsultantIdAndAppointmentDate(consultantId, date);
    }
}
