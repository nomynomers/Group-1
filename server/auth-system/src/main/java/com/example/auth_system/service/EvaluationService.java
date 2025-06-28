package com.example.auth_system.service;
import com.example.auth_system.dto.EvaluationDTO;
import com.example.auth_system.entity.CourseEvaluation;
import com.example.auth_system.entity.User;
import com.example.auth_system.repository.CourseEvaluationRepository;
import com.example.auth_system.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EvaluationService {

    @Autowired
    private CourseEvaluationRepository evaluationRepository;

    @Autowired
    private UserRepository userRepository;

    public List<EvaluationDTO> getEvaluationsByCourseId(int courseId) {
        List<CourseEvaluation> evaluations = evaluationRepository.findByCourseID(courseId);

        return evaluations.stream().map(eval -> {
            EvaluationDTO dto = new EvaluationDTO();
            dto.setEvaluationID(eval.getEvaluationID());
            dto.setCourseID(eval.getCourseID());
            dto.setUserID(eval.getUserID());
            dto.setRating(eval.getRating());
            dto.setComments(eval.getComments());
            dto.setSubmissionDate(eval.getSubmissionDate());

            userRepository.findById(eval.getUserID()).ifPresent(user -> {
                dto.setUsername(user.getFirstName() + " " + user.getLastName());
            });

            return dto;
        }).collect(Collectors.toList());
    }

    public CourseEvaluation createEvaluation(CourseEvaluation evaluation) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        evaluation.setUserID(user.getUserId());
        evaluation.setSubmissionDate(LocalDateTime.now());

        return evaluationRepository.save(evaluation);
    }

}

