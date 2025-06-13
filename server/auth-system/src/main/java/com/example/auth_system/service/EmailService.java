package com.example.auth_system.service;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    public void sendAppointmentConfirmation(String email, LocalDate date, LocalTime startTime) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("Appointment Confirmation");

            String htmlContent = buildConfirmationEmailContent(date, startTime);
            helper.setText(htmlContent, true);

            emailSender.send(message);
            log.info("Appointment confirmation email sent to: {}", email);
        } catch (Exception e) {
            log.error("Failed to send appointment confirmation email to {}: {}", email, e.getMessage());
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

    private String buildConfirmationEmailContent(LocalDate date, LocalTime time) {
        return """
        <html>
        <body style="font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #4CAF50;">Appointment Confirmed!</h2>
                <p>Your appointment has been successfully booked.</p>
                <p><strong>Date:</strong> %s</p>
                <p><strong>Time:</strong> %s</p>
                <p>Please make sure to be available at the scheduled time.</p>
                <br/>
                <p>Best regards,<br/>Support Team</p>
            </div>
        </body>
        </html>
        """.formatted(date.toString(), time.toString());
    }
}
