package com.example.auth_system.service;

import com.example.auth_system.dto.EnrollmentRequest;
import com.example.auth_system.entity.Enrollment;
import com.example.auth_system.entity.User;
import com.example.auth_system.repository.UserRepository;
import com.example.auth_system.repository.EnrollmentRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public Integer enrollUser(EnrollmentRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (enrollmentRepository.existsByUserIDAndCourseID(user.getUserId(), request.getCourseID())) {
            Enrollment existing = enrollmentRepository.findByUserIDAndCourseID(user.getUserId(), request.getCourseID())
                    .orElseThrow();
            return existing.getEnrollmentID();
        }

        Enrollment enrollment = Enrollment.builder()
                .userID(user.getUserId())
                .courseID(request.getCourseID())
                .enrolledAt(LocalDateTime.now())
                .build();

        Enrollment saved = enrollmentRepository.save(enrollment);

        return saved.getEnrollmentID();
    }


    public boolean isUserEnrolled(String email, int courseID) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return enrollmentRepository.existsByUserIDAndCourseID(user.getUserId(), courseID);
    }
}
