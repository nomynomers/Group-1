package com.example.auth_system.service;

import com.example.auth_system.dto.CourseModuleRequest;
import com.example.auth_system.entity.CourseModule;
import com.example.auth_system.repository.CourseModuleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseModuleService {

    @Autowired
    private CourseModuleRepository moduleRepository;

    private String convertToEmbedUrl(String url) {
        if (url == null || url.isEmpty()) return url;

        if (url.contains("youtu.be/")) {
            String id = url.split("youtu.be/")[1].split("[?&]")[0];
            return "https://www.youtube.com/embed/" + id;
        }

        if (url.contains("youtube.com/watch?v=")) {
            String id = url.split("v=")[1].split("&")[0];
            return "https://www.youtube.com/embed/" + id;
        }

        return url;
    }


    public CourseModule createModule(CourseModuleRequest request) {
        CourseModule module = CourseModule.builder()
                .courseID(request.getCourseID())
                .moduleName(request.getModuleName())
                .description(request.getDescription())
                .durationMinutes(request.getDurationMinutes())
                .content(request.getContent())
                .videoUrl(convertToEmbedUrl(request.getVideoUrl()))
                .moduleOrder(request.getModuleOrder())
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
        module.setVideoUrl(convertToEmbedUrl(request.getVideoUrl()));
        module.setModuleOrder(request.getModuleOrder());

        return moduleRepository.save(module);
    }

    public void deleteModule(Integer moduleId) {
        if (!moduleRepository.existsById(moduleId)) {
            throw new RuntimeException("Module not found with ID: " + moduleId);
        }
        moduleRepository.deleteById(moduleId);
    }

    public CourseModule getModuleById(int moduleId) {
        return moduleRepository.findById(moduleId)
                .orElseThrow(() -> new EntityNotFoundException("Module with ID " + moduleId + " not found"));
    }

}
