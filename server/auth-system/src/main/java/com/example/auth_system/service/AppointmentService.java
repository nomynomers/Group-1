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

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;

    /**
     * Creates a new appointment after checking for time conflicts.
     */
    @Transactional
    public MessageResponse createAppointment(AppointmentRequest request) {
        // 1. Validate time availability
        List<Appointment> conflicts = appointmentRepository.findConflictingAppointments(
                request.getConsultantID(),
                request.getAppointmentDate(),
                request.getStartTime(),
                request.getEndTime()
        );

        if (!conflicts.isEmpty()) {
            return new MessageResponse("Error: This time slot is already booked.");
        }


        User user = userRepository.findById(request.getUserID())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Consultant consultant = consultantRepository.findById(request.getConsultantID())
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        // 2. Create appointment
        Appointment appointment = Appointment.builder()
                .user(user)
                .consultant(consultant)
                .appointmentDate(request.getAppointmentDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .note(request.getNote())
                .build();

        appointmentRepository.save(appointment);


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
     * Cancels an appointment by ID.
     */
    @Transactional
    public MessageResponse cancelAppointment(int appointmentID) {
        return appointmentRepository.findById(appointmentID)
                .map(a -> {
                    appointmentRepository.deleteById(appointmentID);
                    return new MessageResponse("Appointment canceled.");
                })
                .orElse(new MessageResponse("Error: Appointment not found."));
    }

    /**
     * Retrieves appointments for a user.
     */
    public List<Appointment> getAppointmentsByUser(int userID) {
        return appointmentRepository.findByUser_UserId(userID);
    }

    /**
     * Retrieves appointments for a consultant on a specific date.
     */
    public List<Appointment> getAppointmentsForConsultantOnDate(int consultantID, LocalDate date) {
        return appointmentRepository.findByConsultant_ConsultantIDAndAppointmentDate(consultantID, date);
    }
}
