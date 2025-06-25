package com.example.auth_system.controller;

import com.example.auth_system.dto.ModuleCompleteDTO;
import com.example.auth_system.entity.UserCourseProgress;
import com.example.auth_system.repository.UserCourseProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/progress")
public class CourseProgressController {

    @Autowired
    private UserCourseProgressRepository repo;

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
}

