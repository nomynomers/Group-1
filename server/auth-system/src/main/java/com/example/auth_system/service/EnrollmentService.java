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

    public String enrollUser(EnrollmentRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); // email from JWT token

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (enrollmentRepository.existsByUserIdAndCourseId(user.getUserId(), request.getCourseID())) {
            throw new RuntimeException("User already enrolled in this course");
        }


        Enrollment enrollment = Enrollment.builder()
                .userId(user.getUserId()) // or getUserId() depending on your User entity
                .courseId(request.getCourseID())
                .enrolledAt(LocalDateTime.now())
                .build();

        enrollmentRepository.save(enrollment);

        return "Enrolled successfully!";
    }

    public boolean isUserEnrolled(String email, int courseID) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return enrollmentRepository.existsByUserIdAndCourseId(user.getUserId(), courseID);
    }
}
