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

    @GetMapping("/{assessmentID}/q1")
    public QuestionDTO getQ1(@PathVariable Integer assessmentID) {
        return service.getQ1DTO(assessmentID);
    }

    @GetMapping("/{assessmentID}/q2to7")
    public List<QuestionDTO> getQ2ToQ7Templates(@PathVariable Integer assessmentID) {
        return service.getQ2ToQ7TemplateDTOs(assessmentID);
    }

    @GetMapping("/q8")
    public QuestionDTO getQ8() {
        return service.getQ8Question();
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
        int userAssessmentId = service.saveAssessment(dto, Integer.parseInt(user.getId()));
        return ResponseEntity.ok(Map.of(
                "message", "Assessment submitted successfully",
                "userAssessmentId", userAssessmentId
        ));
    }


    @GetMapping("/result/{id}")
    public ResponseEntity<?> getResult(@PathVariable int id) {
        Map<String, Object> result = service.getResultByAssessmentId(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{assessmentID}/initial-questions")
    public List<QuestionDTO> getInitialQuestions(@PathVariable Integer assessmentID) {
        return service.getInitialQuestionsForAssessment(assessmentID);
    }

    @GetMapping("/crafft/result/{userAssessmentID}")
    public ResponseEntity<?> getCrafftResultSummary(@PathVariable int userAssessmentID) {
        return ResponseEntity.ok(service.getCrafftResultSummary(userAssessmentID));
    }

}
