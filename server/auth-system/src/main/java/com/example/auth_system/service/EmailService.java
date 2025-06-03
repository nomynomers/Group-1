package com.example.auth_system.service;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


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

    private String buildRegistrationEmailContent(String firstName) {
        return """
            <html>
            <body style="font-family: Arial, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #4CAF50;">Welcome to the system!</h2>
                    <p>Hello <strong>%s</strong>,</p>
                    <p>Thank you for registering. Your account has been successfully created!</p>
                    <p>You can now log in using your registered email and password.</p>
                    <div style="margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
                        <p style="margin: 0;"><strong>Note:</strong> Please keep your login information secure.</p>
                    </div>
                    <p>Best regards,<br>The Development Team</p>
                </div>
            </body>
            </html>
            """.formatted(firstName);
    }
}
