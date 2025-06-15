package com.example.auth_system.controller;

import com.example.auth_system.dto.CourseModuleRequest;
import com.example.auth_system.entity.CourseModule;
import com.example.auth_system.service.CourseModuleService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('ADMIN')")
public class CourseModuleController {
    @Autowired
    private CourseModuleService moduleService;

    @PostMapping("/create")
    public ResponseEntity<CourseModule> createModule(@Valid @RequestBody CourseModuleRequest request) {
        CourseModule module = moduleService.createModule(request);
        return ResponseEntity.ok(module);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/{courseId}")
    public ResponseEntity<List<CourseModule>> getModulesByCourseId(@PathVariable Integer courseId) {
        List<CourseModule> modules = moduleService.getModulesByCourseId(courseId);
        return ResponseEntity.ok(modules);
    }

    @PutMapping("/{moduleId}")

    public ResponseEntity<CourseModule> updateModule(
            @PathVariable Integer moduleId,
            @RequestBody CourseModuleRequest request) {
        CourseModule updated = moduleService.updateModule(moduleId, request);
        return ResponseEntity.ok(updated);
    }
}
