package com.example.auth_system.service;


import com.example.auth_system.dto.AssessmentSubmissionDTO;
import com.example.auth_system.dto.OptionDTO;
import com.example.auth_system.dto.QuestionDTO;
import com.example.auth_system.entity.Assessment;
import com.example.auth_system.entity.AssessmentQuestion;
import com.example.auth_system.entity.UserAssessment;
import com.example.auth_system.entity.UserAssessmentResponse;
import com.example.auth_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AssessmentService {

    @Autowired
    private AssessmentRepository repository;

    @Autowired
    private AssessmentQuestionRepository questionRepo;

    @Autowired
    private QuestionOptionRepository optionRepo;

    @Autowired
    private UserAssessmentRepository userAssessmentRepo;

    @Autowired
    private UserAssessmentResponseRepository userAssessmentResponseRepo;

    public AssessmentService(AssessmentRepository repository) {
        this.repository = repository;
    }

    public List<Assessment> getAllAssessments() {
        return repository.findAll();
    }

    public Assessment createAssessment(Assessment assessment) {
        return repository.save(assessment);
    }

    public List<QuestionDTO> getQuestions(Integer assessmentID) {
        List<AssessmentQuestion> questions = questionRepo.findByAssessmentID(assessmentID);

        return questions.stream().map(q -> {
            QuestionDTO dto = new QuestionDTO();
            dto.questionID = q.getQuestionID();
            dto.questionText = q.getQuestionText();
            dto.options = q.getOptions() != null ? q.getOptions().stream().map(o -> {
                OptionDTO opt = new OptionDTO();
                opt.optionID = o.getOptionID();
                opt.optionValue = o.getOptionValue();
                opt.score = o.getScore();
                return opt;
            }).toList() : new ArrayList<>();
            return dto;
        }).toList();
    }

    public int calculateScore(List<Integer> selectedOptionIds) {
        return selectedOptionIds.stream()
                .map(optionRepo::findById)
                .filter(Optional::isPresent)
                .mapToInt(opt -> opt.get().getScore() != null ? opt.get().getScore() : 0)
                .sum();
    }


    public QuestionDTO convertToDTO(AssessmentQuestion q) {
        QuestionDTO dto = new QuestionDTO();
        dto.questionID = q.getQuestionID();
        dto.questionText = q.getQuestionText();
        dto.options = q.getOptions() != null ? q.getOptions().stream().map(o -> {
            OptionDTO opt = new OptionDTO();
            opt.optionID = o.getOptionID();
            opt.optionValue = o.getOptionValue();
            opt.score = o.getScore();
            return opt;
        }).toList() : new ArrayList<>();
        return dto;
    }

    public QuestionDTO getQ1DTO() {
        return convertToDTO(questionRepo.findById(1002).orElseThrow());
    }

    public List<QuestionDTO> getQ2ToQ7TemplateDTOs() {
        return questionRepo.findAllById(List.of(1003, 1004, 1005,1006, 1007, 1008))
                .stream().map(this::convertToDTO).toList();
    }

    public void saveAssessment(AssessmentSubmissionDTO dto, Integer userId) {
        int totalScore = dto.answers.stream()
                .map(ans -> optionRepo.findById(ans.optionID).orElseThrow().getScore())
                .mapToInt(Integer::intValue)
                .sum();

        String recommendation;
        if (totalScore >= 27) {
            recommendation = "Refer to specialist immediately";
        } else if (totalScore >= 4) {
            recommendation = "Provide brief intervention";
        } else {
            recommendation = "No intervention needed";
        }

        UserAssessment ua = new UserAssessment();
        ua.setUserID(userId);
        ua.setAssessmentID(dto.assessmentID);
        ua.setCompletionDate(LocalDateTime.now());
        ua.setTotalScore(totalScore);
        ua.setRiskLevel(determineRisk(totalScore)); // optional
        ua.setRecommendationProvided(recommendation);
        ua = userAssessmentRepo.save(ua);

        final UserAssessment finalUA = ua;

        List<UserAssessmentResponse> responses = dto.answers.stream()
                .map(ans -> {
                    UserAssessmentResponse r = new UserAssessmentResponse();
                    r.setUserAssessment(finalUA);
                    r.setQuestionID(ans.questionID);
                    r.setOptionID(ans.optionID);
                    return r;
                })
                .toList();


        userAssessmentResponseRepo.saveAll(responses);
    }

    private String determineRisk(int totalScore) {
        if (totalScore >= 27) return "High";
        else if (totalScore >= 11) return "Moderate";
        else return "Low";
    }

}
