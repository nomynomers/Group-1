package com.example.auth_system.controller;

import com.example.auth_system.entity.UserAssessment;
import com.example.auth_system.service.UserAssessmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-assessments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('USER')")
public class UserAssessmentController {

    @Autowired
    private UserAssessmentService service;

    @GetMapping("/{userID}")
    public ResponseEntity<List<UserAssessment>> getAssessmentsByUser(@PathVariable int userID) {
        List<UserAssessment> assessments = service.getAssessmentsByUser(userID);
        return ResponseEntity.ok(assessments);
    }

}
