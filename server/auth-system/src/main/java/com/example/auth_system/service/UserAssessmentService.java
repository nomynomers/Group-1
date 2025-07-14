package com.example.auth_system.service;

import com.example.auth_system.entity.UserAssessment;
import com.example.auth_system.repository.UserAssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAssessmentService {

    @Autowired
    private UserAssessmentRepository repository;

    public UserAssessmentService(UserAssessmentRepository repository) {
        this.repository = repository;
    }

    public List<UserAssessment> getAssessmentsByUser(int userID) {
        return repository.findByUserID(userID);
    }
}

