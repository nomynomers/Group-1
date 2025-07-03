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

            // Chuyển về định dạng RFC 3339
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
//                .meetingLink("https://meet.example.com/" + System.currentTimeMillis())
                .meetingLink(createGoogleMeetLink(request))
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
                .name(a.getConsultant().getUser().getFirstName() + " " + a.getConsultant().getUser().getLastName())
                .meetingLink(a.getMeetingLink())
                .date(a.getAppointmentDate().toString())
                .startTime(a.getStartTime().toString())
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
                .name(a.getUser().getFirstName() + " " + a.getUser().getLastName())
                .meetingLink(a.getMeetingLink())
                .date(a.getAppointmentDate().toString())
                .startTime(a.getStartTime().toString())
                .build()
        ).collect(Collectors.toList());
    }

}
