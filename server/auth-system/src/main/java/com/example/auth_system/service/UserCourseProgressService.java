package com.example.auth_system.service;

import com.example.auth_system.entity.UserCourseProgress;
import com.example.auth_system.repository.UserCourseProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserCourseProgressService {
    @Autowired
    private UserCourseProgressRepository progressRepository;

    public Boolean getCompletionStatus(Integer enrollId, Integer moduleId) {
        return progressRepository.findByEnrollIdAndModuleID(enrollId, moduleId)
                .map(UserCourseProgress::getCompletionStatus)
                .orElse(false);
    }
}

