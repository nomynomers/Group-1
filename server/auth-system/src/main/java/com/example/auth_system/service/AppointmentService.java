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
import com.google.api.services.calendar.model.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;
    private final EmailService emailService;
    private final GoogleCalendarService googleCalendarService;

    private String createGoogleMeetLink(AppointmentRequest request) {
        try {
            com.google.api.services.calendar.Calendar service = googleCalendarService.getCalendarService();

            // Lấy ngày giờ bắt đầu và kết thúc (có timezone)
            ZonedDateTime startDateTime = ZonedDateTime.of(
                    request.getAppointmentDate(),
                    request.getStartTime(),
                    ZoneId.of("Asia/Ho_Chi_Minh")
            );

            ZonedDateTime endDateTime = startDateTime.plusMinutes(30);

            DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
            String formattedStart = startDateTime.format(formatter);
            String formattedEnd = endDateTime.format(formatter);

            Event event = new Event()
                    .setSummary("Consultation Appointment")
                    .setStart(new EventDateTime()
                            .setDateTime(new com.google.api.client.util.DateTime(formattedStart))
                            .setTimeZone("Asia/Ho_Chi_Minh"))
                    .setEnd(new EventDateTime()
                            .setDateTime(new com.google.api.client.util.DateTime(formattedEnd))
                            .setTimeZone("Asia/Ho_Chi_Minh"))
                    .setConferenceData(new ConferenceData().setCreateRequest(
                            new CreateConferenceRequest()
                                    .setRequestId(UUID.randomUUID().toString())
                                    .setConferenceSolutionKey(new ConferenceSolutionKey().setType("hangoutsMeet"))
                    ));

            Event createdEvent = service.events().insert("primary", event)
                    .setConferenceDataVersion(1)
                    .execute();

            log.info("Created Event Response: {}", createdEvent.toPrettyString());

            String link = createdEvent.getHangoutLink();
            log.info("Google Meet Link: {}", link);

            return link;

        } catch (Exception e) {
            log.error("Failed to create Google Meet link: {}", e.getMessage(), e);
            return null;
        }
    }



    @Transactional
    public MessageResponse createAppointment(AppointmentRequest request) {
        List<Appointment> userConflicts = appointmentRepository.findConflictingAppointmentsForUser(
                request.getUserID(),
                request.getAppointmentDate(),
                request.getStartTime()
        );

        if (!userConflicts.isEmpty()) {
            return new MessageResponse("Error: You already have an appointment scheduled at this time. Please choose another time slot.");
        }

        List<Consultant> consultants = consultantRepository.findAll();
        if (consultants.isEmpty()) {
            throw new RuntimeException("No consultant available");
        }

        Consultant assignedConsultant = null;

        for (Consultant consultant : consultants) {
            List<Appointment> conflicts = appointmentRepository.findConflictingAppointments(
                    consultant.getConsultantID(),
                    request.getAppointmentDate(),
                    request.getStartTime()
            );

            if (conflicts.isEmpty()) {
                assignedConsultant = consultant;
                break;
            }
        }

        if (assignedConsultant == null) {
            return new MessageResponse("Error: All consultants are booked at this time. Please choose another time slot.");
        }


        User user = userRepository.findById(request.getUserID())
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalTime start = request.getStartTime();
        LocalTime end = start.plusHours(1);

        Appointment appointment = Appointment.builder()
                .user(user)
                .consultant(assignedConsultant)
                .appointmentDate(request.getAppointmentDate())
                .startTime(start)
                .endTime(end)
                .status("Pending")
                .build();

        appointmentRepository.save(appointment);

        try {
            emailService.sendAppointmentConfirmation(
                    user.getEmail(),
                    request.getAppointmentDate(),
                    request.getStartTime(),
                    request.getEndTime()
            );
        } catch (Exception e) {
            log.error("Failed to send confirmation email: {}", e.getMessage());
        }

        return new MessageResponse("Appointment booked successfully.");
    }


    public List<AppointmentResponse> getAppointmentsByUser(int userId) {
        List<Appointment> appointments = appointmentRepository.findByUser_UserId(userId);

        return appointments.stream().map(a -> AppointmentResponse.builder()
                .name(a.getConsultant().getUser().getFirstName() + " " + a.getConsultant().getUser().getLastName())
                .meetingLink(a.getMeetingLink())
                .date(a.getAppointmentDate().toString())
                .startTime(a.getStartTime().toString())
                .endTime(a.getStartTime().plusHours(1).toString())
                .status(a.getStatus())
                .note(a.getNote())
                .build()
        ).collect(Collectors.toList());
    }

    public boolean isConsultantAvailable(int consultantId, LocalDate date, LocalTime startTime) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        if (!consultant.isAvailable()) {
            return false;
        }

        List<Appointment> conflicts = appointmentRepository.findConflictingAppointments(
                consultantId, date, startTime
        );

        return conflicts.isEmpty();
    }

    public List<AppointmentResponse> getAppointmentsByConsultant_ConsultantID(int consultantId) {
        List<Appointment> appointments =  appointmentRepository.findByConsultant_ConsultantID(consultantId);

        return appointments.stream().map(a -> AppointmentResponse.builder()
                .appointmentID(a.getAppointmentID())
                .name(a.getUser().getFirstName() + " " + a.getUser().getLastName())
                .meetingLink(a.getMeetingLink())
                .date(a.getAppointmentDate().toString())
                .startTime(a.getStartTime().toString())
                .endTime(a.getStartTime().plusHours(1).toString())
                .status(a.getStatus())
                .note(a.getNote())
                .build()
        ).collect(Collectors.toList());
    }

    public void updateStatus(int appointmentId, String status) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(status);

        if ("Confirmed".equalsIgnoreCase(status)) {
            if (appointment.getMeetingLink() == null || appointment.getMeetingLink().isEmpty()) {
                AppointmentRequest request = AppointmentRequest.builder()
                        .userID(appointment.getUser().getUserId())
                        .appointmentDate(appointment.getAppointmentDate())
                        .startTime(appointment.getStartTime())
                        .endTime(appointment.getEndTime())
                        .build();

                String link = createGoogleMeetLink(request);
                appointment.setMeetingLink(link);

                try {
                    emailService.sendMeetingLinkEmail(
                            appointment.getUser().getEmail(),
                            appointment.getAppointmentDate(),
                            appointment.getStartTime(),
                            appointment.getEndTime(),
                            link
                    );
                } catch (Exception e) {
                    log.error("Failed to send meeting link email: {}", e.getMessage());
                }
            }
        }

        appointmentRepository.save(appointment);
    }



    public void cancelAppointment(int id, String note) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus("Canceled");
        appointment.setNote(note);
        appointmentRepository.save(appointment);

        try {
            emailService.sendCancellationEmail(
                    appointment.getUser().getEmail(),
                    appointment.getAppointmentDate(),
                    appointment.getStartTime(),
                    appointment.getStatus(),
                    note
            );
        } catch (Exception e) {
            log.error("Failed to send cancellation email: {}", e.getMessage());
        }
    }

}