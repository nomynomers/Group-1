package com.example.auth_system.service;

import com.example.auth_system.dto.CourseModuleRequest;
import com.example.auth_system.entity.CourseModule;
import com.example.auth_system.repository.CourseModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseModuleService {

    @Autowired
    private CourseModuleRepository moduleRepository;

    public CourseModule createModule(CourseModuleRequest request) {
        CourseModule module = CourseModule.builder()
                .courseID(request.getCourseID())
                .moduleName(request.getModuleName())
                .description(request.getDescription())
                .durationMinutes(request.getDurationMinutes())
                .content(request.getContent())
                .content(request.getVideoUrl())
                .build();
        return moduleRepository.save(module);
    }

    public List<CourseModule> getModulesByCourseId(Integer courseId) {
        return moduleRepository.findByCourseID(courseId);
    }

    public CourseModule updateModule(Integer moduleId, CourseModuleRequest request) {
        CourseModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found with ID: " + moduleId));

        module.setCourseID(request.getCourseID());
        module.setModuleName(request.getModuleName());
        module.setDescription(request.getDescription());
        module.setDurationMinutes(request.getDurationMinutes());
        module.setContent(request.getContent());
        module.setVideoUrl(request.getVideoUrl());

        return moduleRepository.save(module);
    }

    public void deleteModule(Integer moduleId) {
        if (!moduleRepository.existsById(moduleId)) {
            throw new RuntimeException("Module not found with ID: " + moduleId);
        }
        moduleRepository.deleteById(moduleId);
    }
}
