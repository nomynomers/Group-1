package com.example.auth_system.repository;

import com.example.auth_system.entity.UserAssessmentResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAssessmentResponseRepository extends JpaRepository<UserAssessmentResponse, Integer> {}
