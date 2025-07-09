package com.example.auth_system.repository;

import com.example.auth_system.entity.UserAssessmentResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAssessmentResponseRepository extends JpaRepository<UserAssessmentResponse, Integer> {
    List<UserAssessmentResponse> findByUserAssessment_UserAssessmentID(int userAssessmentID);
}
