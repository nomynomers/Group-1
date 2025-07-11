package com.example.auth_system.repository;

import com.example.auth_system.entity.AssessmentQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssessmentQuestionRepository extends JpaRepository<AssessmentQuestion, Integer> {
    List<AssessmentQuestion> findByAssessmentID(Integer assessmentID);
    List<AssessmentQuestion> findByAssessmentIDAndIsInitialQuestionTrue(Integer assessmentID);
}
