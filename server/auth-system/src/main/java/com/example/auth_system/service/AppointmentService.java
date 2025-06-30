package com.example.auth_system.service;

import com.example.auth_system.dto.AppointmentRequest;
import com.example.auth_system.dto.AppointmentResponse;
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
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;
    private final EmailService emailService;

    @Transactional
    public MessageResponse createAppointment(AppointmentRequest request) {
        List<Consultant> consultants = consultantRepository.findAll();
        if (consultants.isEmpty()) {
            throw new RuntimeException("No consultant available");
        }

        Consultant assignedConsultant = consultants.get(0);

        List<Appointment> conflicts = appointmentRepository.findConflictingAppointments(
                assignedConsultant.getConsultantID(),
                request.getAppointmentDate(),
                request.getStartTime()
        );

        if (!conflicts.isEmpty()) {
            return new MessageResponse("Error: This time slot is already booked.");
        }

        User user = userRepository.findById(request.getUserID())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Appointment appointment = Appointment.builder()
                .user(user)
                .consultant(assignedConsultant)
                .appointmentDate(request.getAppointmentDate())
                .startTime(request.getStartTime())
                .status("Booked")
                .meetingLink("https://meet.example.com/" + System.currentTimeMillis())
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

    public List<AppointmentResponse> getAppointmentsByUser(int userId) {
        List<Appointment> appointments = appointmentRepository.findByUser_UserId(userId);

        return appointments.stream().map(a -> AppointmentResponse.builder()
                .consultantName(a.getConsultant().getUser().getFirstName() + " " + a.getConsultant().getUser().getLastName())
                .meetingLink(a.getMeetingLink())
                .date(a.getAppointmentDate().toString())
                .startTime(a.getStartTime().toString())
                .build()
        ).collect(Collectors.toList());
    }

}
