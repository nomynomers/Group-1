package com.example.auth_system.service;

import com.example.auth_system.dto.EnrolledCourseDTO;
import com.example.auth_system.dto.EnrollmentRequest;
import com.example.auth_system.entity.Course;
import com.example.auth_system.entity.Enrollment;
import com.example.auth_system.entity.User;
import com.example.auth_system.repository.CourseRepository;
import com.example.auth_system.repository.UserRepository;
import com.example.auth_system.repository.EnrollmentRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    @Autowired
    private CourseRepository courseRepository;

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

    public List<EnrolledCourseDTO> getEnrolledCoursesDTOByUsername(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Enrollment> enrollments = enrollmentRepository.findByUserID(user.getUserId());

        return enrollments.stream().map(enrollment -> {
            Course course = courseRepository.findById(enrollment.getCourseID())
                    .orElse(null);
            if (course == null) return null;

            return new EnrolledCourseDTO(
                    course.getCourseID(),
                    course.getCourseName(),
                    course.getDescription(),
                    course.getImageCover(),
                    enrollment.getProgressPercentage(),
                    enrollment.getCompleteDate()
            );
        }).filter(dto -> dto != null).collect(Collectors.toList());
    }
}
