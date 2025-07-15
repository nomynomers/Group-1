package com.example.auth_system.service;

import com.example.auth_system.entity.CourseModule;
import com.example.auth_system.entity.ModuleCompletions;
import com.example.auth_system.repository.CourseModuleRepository;
import com.example.auth_system.repository.EnrollmentRepository;
import com.example.auth_system.repository.ModuleCompletionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ModuleCompletionService {
    @Autowired
    private ModuleCompletionRepository progressRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseModuleRepository moduleRepository;

    public Boolean getCompletionStatus(Integer enrollId, Integer moduleId) {
        return progressRepository.findByEnrollIdAndModuleID(enrollId, moduleId)
                .map(ModuleCompletions::getCompletionStatus)
                .orElse(false);
    }

    public boolean hasCompletedAllModules(Integer enrollId, Integer courseId) {
        Integer total = progressRepository.countModulesInCourse(courseId);
        Integer completed = progressRepository.countCompletedModules(enrollId, courseId);

        boolean allCompleted = completed >= total && total > 0;

        if (allCompleted) {
            enrollmentRepository.findById(enrollId).ifPresent(enroll -> {
                if (enroll.getCompleteDate() == null) { // chỉ set nếu chưa có
                    enroll.setCompleteDate(LocalDateTime.now());
                    enrollmentRepository.save(enroll);
                }
            });
        }

        return allCompleted;
    }

    public void updateProgressPercentage(Integer enrollId, Integer courseId) {
        int totalModules = progressRepository.countModulesInCourse(courseId);
        int completedModules = progressRepository.countCompletedModules(enrollId, courseId);

        if (totalModules > 0) {
            int percentage = (int) ((completedModules * 100.0f) / totalModules);

            enrollmentRepository.findById(enrollId).ifPresent(enroll -> {
                enroll.setProgressPercentage(percentage);
                enrollmentRepository.save(enroll);
            });
        }
    }

    public Integer getCourseIdByModuleId(Integer moduleId) {
        return moduleRepository.findById(moduleId)
                .map(CourseModule::getCourseID)
                .orElseThrow(() -> new RuntimeException("Module not found"));
    }
}

