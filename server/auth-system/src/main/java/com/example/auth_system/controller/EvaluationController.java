package com.example.auth_system.controller;

import com.example.auth_system.entity.CourseEvaluation;
import com.example.auth_system.repository.CourseEvaluationRepository;
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

    @GetMapping("/all")
    public List<CourseEvaluation> getAllEvaluations() {
        return repository.findAll();
    }

    @GetMapping("/by-course/{courseId}")
    public List<CourseEvaluation> getByCourse(@PathVariable int courseId) {
        return repository.findByCourseID(courseId);
    }

    @PostMapping("/create")
    public ResponseEntity<CourseEvaluation> createEvaluation(@RequestBody CourseEvaluation evaluation) {
        evaluation.setSubmissionDate(LocalDateTime.now());
        CourseEvaluation saved = repository.save(evaluation);
        return ResponseEntity.ok(saved);
    }

}