package com.example.auth_system.service;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@Slf4j
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;
    @Value("${app.frontend-url}")
    private String frontendUrl;
    public void sendRegistrationSuccessEmail(String to, String firstName) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Account Registration Successful!");

            String htmlContent = buildRegistrationEmailContent(firstName);
            helper.setText(htmlContent, true);

            emailSender.send(message);
            log.info("Registration success email sent to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send registration email to: {}", to, e);
        }
    }

    public void sendAppointmentConfirmation(String email, LocalDate date, LocalTime startTime, LocalTime endTime) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("Appointment Confirmation");

            String htmlContent = buildConfirmationEmailContent(date, startTime, endTime);
            helper.setText(htmlContent, true);

            emailSender.send(message);
            log.info("Appointment confirmation email sent to: {}", email);
        } catch (Exception e) {
            log.error("Failed to send appointment confirmation email to {}: {}", email, e.getMessage());
        }
    }

    public void sendMeetingLinkEmail(String email, LocalDate date, LocalTime startTime, LocalTime endTime, String link) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("Your Appointment Has Been Confirmed");

            String htmlContent = buildMeetingLinkEmailContent(date, startTime, endTime, link);
            helper.setText(htmlContent, true);

            emailSender.send(message);
            log.info("Meeting link email sent to: {}", email);
        } catch (Exception e) {
            log.error("Failed to send meeting link email to {}: {}", email, e.getMessage());
        }
    }
    
    public void sendCancellationEmail(String email, LocalDate date, LocalTime startTime, String status, String note) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("Appointment Canceled");

            String htmlContent = buildCancellationEmailContent(date, startTime, status, note);
            helper.setText(htmlContent, true);

            emailSender.send(message);
            log.info("Cancellation email sent to: {}", email);
        } catch (Exception e) {
            log.error("Failed to send cancellation email to {}: {}", email, e.getMessage());
        }
    }

    private String buildRegistrationEmailContent(String firstName) {
        return """
            <html>
            <body>
                <h3>Hello %s,</h3>
                <p>Thank you for registering. Your account is now active.</p>
                <p>Best regards,<br/>Support Team</p>
            </body>
            </html>
        """.formatted(firstName);
    }

    private String buildConfirmationEmailContent(LocalDate date, LocalTime startTime, LocalTime endTime) {
        return """
        <html>
        <body style="font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #4CAF50;">Appointment Confirmed!</h2>
                <p>Your appointment has been successfully booked.</p>
                <p><strong>Date:</strong> %s</p>
                <p><strong>Time:</strong> %s - %s</p>
                <p>Please wait your consultant to confirmed.</p>
                <br/>
                <p>Best regards,<br/>Support Team</p>
            </div>
        </body>
        </html>
        """.formatted(date.toString(), startTime.toString(), endTime.toString());
    }

    private String buildMeetingLinkEmailContent(LocalDate date, LocalTime startTime, LocalTime endTime, String link) {
        return """
        <html>
        <body style="font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #4CAF50;">Appointment Confirmed with Google Meet</h2>
                <p>Your consultation appointment has been confirmed.</p>
                <p><strong>Date:</strong> %s</p>
                <p><strong>Time:</strong> %s - %s</p>
                <p><strong>Meeting Link:</strong> <a href="%s">%s</a></p>
                <p>Please join the meeting on time.</p>
                <br/>
                <p>Best regards,<br/>Support Team</p>
            </div>
        </body>
        </html>
        """.formatted(date.toString(), startTime.toString(), endTime.toString(), link, link);
    }

    private String buildCancellationEmailContent(LocalDate date, LocalTime time, String status, String note) {
        return """
        <html>
        <body style="font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #f44336;">Appointment Canceled</h2>
                <p>We regret to inform you that your consultation appointment has been canceled.</p>
                <p><strong>Date:</strong> %s</p>
                <p><strong>Time:</strong> %s</p>
                <p><strong>Status:</strong> %s</p>
                <p><strong>Reason:</strong> %s</p>
                <p>If you have any questions, please contact support.</p>
                <br/>
                <p>Best regards,<br/>Support Team</p>
            </div>
        </body>
        </html>
        """.formatted(date.toString(), time.toString(), status, note);
    }

}
