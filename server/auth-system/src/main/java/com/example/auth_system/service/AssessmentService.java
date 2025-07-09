package com.example.auth_system.service;


import com.example.auth_system.dto.AssessmentSubmissionDTO;
import com.example.auth_system.dto.OptionDTO;
import com.example.auth_system.dto.QuestionDTO;
import com.example.auth_system.entity.*;
import com.example.auth_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

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

    public int saveAssessment(AssessmentSubmissionDTO dto, Integer userId) {
        // Group answers theo substance
        Map<String, List<AssessmentSubmissionDTO.AnswerDTO>> answersBySubstance = dto.answers.stream()
                .collect(Collectors.groupingBy(ans -> ans.substance));

        Map.Entry<String, List<AssessmentSubmissionDTO.AnswerDTO>> maxEntry = answersBySubstance.entrySet().stream()
                .max(Comparator.comparingInt(entry ->
                        entry.getValue().stream()
                                .map(ans -> optionRepo.findById(ans.optionID).orElseThrow().getScore())
                                .mapToInt(Integer::intValue)
                                .sum()
                ))
                .orElseThrow(() -> new RuntimeException("No substance answered"));

        String topSubstance = maxEntry.getKey();
        int topScore = maxEntry.getValue().stream()
                .map(ans -> optionRepo.findById(ans.optionID).orElseThrow().getScore())
                .mapToInt(Integer::intValue)
                .sum();

        String topRisk = determineRisk(topScore);
        String topRecommendation = determineRecommendation(topScore);

        UserAssessment ua = new UserAssessment();
        ua.setUserID(userId);
        ua.setAssessmentID(dto.assessmentID);
        ua.setCompletionDate(LocalDateTime.now());
        ua.setTotalScore(topScore);
        ua.setRiskLevel(topRisk);
        ua.setRecommendationProvided(topRecommendation);
        ua = userAssessmentRepo.save(ua);

        final UserAssessment finalUA = ua;

        List<UserAssessmentResponse> responses = dto.answers.stream()
                .map(ans -> {
                    UserAssessmentResponse r = new UserAssessmentResponse();
                    r.setUserAssessment(finalUA);
                    r.setQuestionID(ans.questionID);
                    r.setOptionID(ans.optionID);
                    r.setSubstance(ans.substance);
                    r.setQuestionTemplate(ans.questionTemplate);
                    return r;
                })
                .toList();

        userAssessmentResponseRepo.saveAll(responses);
        return ua.getUserAssessmentID();
    }


    private String determineRisk(int totalScore) {
        if (totalScore >= 27) return "High";
        else if (totalScore >= 11) return "Moderate";
        else return "Low";
    }

    private String determineRecommendation(int score) {
        if (score >= 27) return "Refer to specialist immediately";
        else if (score >= 4) return "Provide brief intervention";
        else return "No intervention needed";
    }


    public Map<String, Object> getResultByAssessmentId(int id) {
        UserAssessment ua = userAssessmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        List<UserAssessmentResponse> responses = userAssessmentResponseRepo.findByUserAssessment_UserAssessmentID(id);

        Map<String, List<UserAssessmentResponse>> grouped = responses.stream()
                .collect(Collectors.groupingBy(UserAssessmentResponse::getSubstance));

        List<Map<String, Object>> substanceResults = new ArrayList<>();

        for (String substance : grouped.keySet()) {
            List<UserAssessmentResponse> subResponses = grouped.get(substance);

            int subScore = subResponses.stream()
                    .map(r -> optionRepo.findById(r.getOptionID()).orElse(null))
                    .filter(Objects::nonNull)
                    .mapToInt(opt -> opt.getScore() != null ? opt.getScore() : 0)
                    .sum();

            String recommendation = determineRecommendation(subScore);
            String riskLevel = determineRisk(subScore);

            List<Map<String, Object>> answers = subResponses.stream().map(r -> {
                QuestionOption option = optionRepo.findById(r.getOptionID()).orElse(null);
                String question = r.getQuestionTemplate().replace("[SUBSTANCE]", r.getSubstance());

                return Map.<String, Object>of( 
                        "question", question,
                        "answer", option != null ? option.getOptionValue() : "N/A",
                        "score", option != null ? option.getScore() : 0
                );
            }).collect(Collectors.toList());

            substanceResults.add(Map.of(
                    "substance", substance,
                    "totalScore", subScore,
                    "riskLevel", riskLevel,
                    "recommendation", recommendation,
                    "answers", answers
            ));
        }

        return Map.of(
                "assessmentId", ua.getUserAssessmentID(),
                "results", substanceResults
        );

    }


}
