package com.example.auth_system.controller;

import com.example.auth_system.dto.EvaluationDTO;
import com.example.auth_system.entity.CourseEvaluation;
import com.example.auth_system.repository.CourseEvaluationRepository;
import com.example.auth_system.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/evaluations")
@CrossOrigin(origins = "http://localhost:5173")
public class EvaluationController {

    @Autowired
    private CourseEvaluationRepository repository;

    @Autowired
    private EvaluationService evaluationService;

    @GetMapping("/all")
    public ResponseEntity<List<CourseEvaluation>> getAllEvaluations() {
        return ResponseEntity.ok(evaluationService.getAllEvaluations());
    }

    @GetMapping("/by-course/{courseId}")
    public ResponseEntity<List<EvaluationDTO>> getEvaluationsByCourse(@PathVariable int courseId) {
        List<EvaluationDTO> result = evaluationService.getEvaluationsByCourseId(courseId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/create")
    public ResponseEntity<CourseEvaluation> createEvaluation(@RequestBody CourseEvaluation evaluation) {
        CourseEvaluation savedEvaluation = evaluationService.createEvaluation(evaluation);
        return ResponseEntity.ok(savedEvaluation);
    }


}