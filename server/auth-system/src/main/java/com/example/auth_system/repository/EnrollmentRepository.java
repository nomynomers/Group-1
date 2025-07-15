package com.example.auth_system.repository;

import com.example.auth_system.entity.Course;
import com.example.auth_system.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    boolean existsByUserIDAndCourseID(int userID, int courseID);
    Optional<Enrollment> findByUserIDAndCourseID(Integer userID, Integer courseID);
    List<Enrollment> findByUserID(Integer userID);
}
