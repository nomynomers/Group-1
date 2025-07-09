package com.example.auth_system.controller;


import com.example.auth_system.config.UserPrincipal;
import com.example.auth_system.dto.AssessmentSubmissionDTO;
import com.example.auth_system.dto.QuestionDTO;
import com.example.auth_system.entity.Assessment;
import com.example.auth_system.entity.AssessmentQuestion;
import com.example.auth_system.service.AssessmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class AssessmentController {

    @Autowired
    private AssessmentService service;

    public AssessmentController(AssessmentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Assessment> getAllAssessments() {
        return service.getAllAssessments();
    }

    @GetMapping("/q1")
    public QuestionDTO getQ1() {
        return service.getQ1DTO();
    }

    @GetMapping("/q2to7")
    public List<QuestionDTO> getTemplates() {
        return service.getQ2ToQ7TemplateDTOs();
    }


    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    @SecurityRequirement(name = "bearerAuth")
    public Assessment createAssessment(@RequestBody Assessment assessment) {
        return service.createAssessment(assessment);
    }

    @GetMapping("/{id}/questions")
    public List<QuestionDTO> getQuestions(@PathVariable Integer id) {
        return service.getQuestions(id);
    }

    @PostMapping("/{id}/submit")
    public Map<String, Object> submitAnswers(@RequestBody List<Integer> selectedOptionIds) {
        int score = service.calculateScore(selectedOptionIds);
        return Map.of("totalScore", score);
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitAssessment(
            @RequestBody AssessmentSubmissionDTO dto,
            @AuthenticationPrincipal UserPrincipal user
    ) {
        int id = service.saveAssessment(dto, Integer.parseInt(user.getId())); // sửa kiểu trả về là int
        return ResponseEntity.ok(Map.of(
                "message", "Assessment submitted successfully",
                "assessmentId", id
        ));
    }


    @GetMapping("/result/{id}")
    public ResponseEntity<?> getResult(@PathVariable int id) {
        Map<String, Object> result = service.getResultByAssessmentId(id);
        return ResponseEntity.ok(result);
    }


}
