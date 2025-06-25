package com.example.auth_system.repository;

import com.example.auth_system.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    boolean existsByUserIdAndCourseId(int userId, int courseId);
    Optional<Enrollment> findByUserIdAndCourseId(Integer userId, Integer courseId);
}
