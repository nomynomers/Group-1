package com.example.auth_system.controller;

import com.example.auth_system.dto.ModuleCompleteDTO;
import com.example.auth_system.entity.UserCourseProgress;
import com.example.auth_system.repository.UserCourseProgressRepository;
import com.example.auth_system.service.UserCourseProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
public class CourseProgressController {

    @Autowired
    private UserCourseProgressRepository repo;

    @Autowired
    private UserCourseProgressService progressService;

    @PostMapping("/complete")
    public ResponseEntity<?> markAsCompleted(@RequestBody ModuleCompleteDTO dto) {
        UserCourseProgress progress = repo
                .findByEnrollIdAndModuleID(dto.getEnrollId(), dto.getModuleId())
                .orElse(new UserCourseProgress());

        progress.setEnrollId(dto.getEnrollId());
        progress.setModuleID(dto.getModuleId());
        progress.setCompletionStatus(true);
        progress.setCompletionDate(LocalDateTime.now());

        repo.save(progress);
        return ResponseEntity.ok("Marked as completed");
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getCompletionStatus(
            @RequestParam Integer enrollId,
            @RequestParam Integer moduleId) {

        Boolean status = progressService.getCompletionStatus(enrollId, moduleId);
        Map<String, Object> response = new HashMap<>();
        response.put("completionStatus", status);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/course-complete")
    public ResponseEntity<Map<String, Object>> isCourseCompleted(
            @RequestParam Integer enrollId,
            @RequestParam Integer courseId) {

        boolean isCompleted = progressService.hasCompletedAllModules(enrollId, courseId);
        Map<String, Object> response = new HashMap<>();
        response.put("courseCompleted", isCompleted);
        return ResponseEntity.ok(response);
    }
}

