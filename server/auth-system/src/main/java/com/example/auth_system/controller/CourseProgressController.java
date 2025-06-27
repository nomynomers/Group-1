package com.example.auth_system.controller;

import com.example.auth_system.dto.ModuleCompleteDTO;
import com.example.auth_system.entity.ModuleCompletions;
import com.example.auth_system.repository.ModuleCompletionRepository;
import com.example.auth_system.service.ModuleCompletionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
public class CourseProgressController {

    @Autowired
    private ModuleCompletionRepository repo;

    @Autowired
    private ModuleCompletionService progressService;

    @PostMapping("/complete")
    public ResponseEntity<?> markAsCompleted(@RequestBody ModuleCompleteDTO dto) {
        ModuleCompletions progress = repo
                .findByEnrollIdAndModuleID(dto.getEnrollId(), dto.getModuleId())
                .orElse(new ModuleCompletions());

        progress.setEnrollId(dto.getEnrollId());
        progress.setModuleID(dto.getModuleId());
        progress.setCompletionStatus(true);

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

