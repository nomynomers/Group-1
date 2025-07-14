package com.example.auth_system.repository;

import com.example.auth_system.entity.UserAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAssessmentRepository extends JpaRepository<UserAssessment, Integer> {
    List<UserAssessment> findByUserID(int userID);
}