package com.example.auth_system.repository;

import com.example.auth_system.entity.CourseEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseEvaluationRepository extends JpaRepository<CourseEvaluation, Integer> {
    List<CourseEvaluation> findByCourseID(Integer courseID);
}
