package com.example.auth_system.repository;

import com.example.auth_system.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    List<Course> findTop3ByOrderByCreationDateDesc();
    List<Course> findByTargetAudience(String targetAudience);
    List<Course> findByCourseNameContainingIgnoreCase(String keyword);
    List<Course> findByTargetAudienceAndCourseNameContainingIgnoreCase(String audience, String keyword);
}
