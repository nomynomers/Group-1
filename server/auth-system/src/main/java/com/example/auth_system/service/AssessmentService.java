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
            dto.questionOrder = q.getQuestionOrder();
            dto.isInitialQuestion = q.isInitialQuestion();
            dto.options = q.getOptions() != null ? q.getOptions().stream().map(o -> {
                OptionDTO opt = new OptionDTO();
                opt.optionID = o.getOptionID();
                opt.optionText = o.getOptionText();
                opt.score = o.getScore();
                opt.nextQuestionID = o.getNextQuestionID();
                opt.optionOrder = o.getOptionOrder();
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
        dto.questionOrder = q.getQuestionOrder();
        dto.isInitialQuestion = q.isInitialQuestion();
        dto.options = q.getOptions() != null ? q.getOptions().stream().map(o -> {
            OptionDTO opt = new OptionDTO();
            opt.optionID = o.getOptionID();
            opt.optionText = o.getOptionText();
            opt.score = o.getScore();
            opt.nextQuestionID = o.getNextQuestionID();
            opt.optionOrder = o.getOptionOrder();
            return opt;
        }).toList() : new ArrayList<>();
        return dto;
    }

    public QuestionDTO getQ1DTO(int assessmentId) {
        return convertToDTO(
                questionRepo.findFirstByAssessmentIDAndIsInitialQuestionTrue(assessmentId)
                        .orElseThrow(() -> new RuntimeException("Q1 not found"))
        );
    }


    public List<QuestionDTO> getQ2ToQ7TemplateDTOs(int assessmentId) {
        return questionRepo.findByAssessmentIDAndIsInitialQuestionFalseOrderByQuestionOrder(assessmentId)
                .stream()
                .filter(q -> q.getQuestionOrder() >= 2 && q.getQuestionOrder() <= 7)
                .map(this::convertToDTO)
                .toList();
    }

    public QuestionDTO getQ8Question() {
        AssessmentQuestion q = questionRepo.findById(2002)
                .orElseThrow(() -> new RuntimeException("Q8 not found"));

        return convertToDTO(q);
    }



    public int saveAssessment(AssessmentSubmissionDTO dto, Integer userId) {

        Map<String, List<AssessmentSubmissionDTO.AnswerDTO>> answersBySubstance = dto.answers.stream()
                .collect(Collectors.groupingBy(ans -> ans.substance));


        Map.Entry<String, List<AssessmentSubmissionDTO.AnswerDTO>> maxEntry = answersBySubstance.entrySet().stream()
                .max(Comparator.comparingInt(entry -> {
                    String substance = entry.getKey();
                    return entry.getValue().stream()
                            .filter(ans -> !(substance.equalsIgnoreCase("Tobacco products") && isQuestion5(ans.questionID)))
                            .map(ans -> optionRepo.findById(ans.optionID).orElseThrow().getScore())
                            .mapToInt(Integer::intValue)
                            .sum();
                }))
                .orElseThrow(() -> new RuntimeException("No substance answered"));


        String topSubstance = maxEntry.getKey();

        int topScore = maxEntry.getValue().stream()
                .filter(ans -> !(topSubstance.equalsIgnoreCase("Tobacco products") && isQuestion5(ans.questionID)))
                .map(ans -> optionRepo.findById(ans.optionID).orElseThrow().getScore())
                .mapToInt(Integer::intValue)
                .sum();


        String topRisk = determineRisk(topSubstance, topScore);
        String topRecommendation = determineRecommendation(topSubstance, topScore);


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
                    return r;
                })
                .toList();

        userAssessmentResponseRepo.saveAll(responses);
        return ua.getUserAssessmentID();
    }

    private boolean isQuestion5(int questionID) {
        return questionRepo.findById(questionID)
                .map(q -> q.getQuestionOrder() == 5)
                .orElse(false);
    }


    private String determineRisk(String substance, int score) {
        if (score >= 27) {
            return "High";
        }

        if ("Alcoholic beverages".equalsIgnoreCase(substance)) {
            return score >= 11 ? "Moderate" : "Low";
        }

        return score >= 4 ? "Moderate" : "Low";
    }


    private String determineRecommendation(String substance, int score) {
        if (score >= 27) {
            return "Please book an appointment with an expert.";
        }

        if ("Alcoholic beverages".equals(substance)) {
            if (score >= 11) return "Please join our recommended courses.";
            else return "No intervention needed";
        }

        if (score >= 4) {
            return "Please join our recommended courses.";
        }

        return "No intervention needed";
    }



    public Map<String, Object> getResultByAssessmentId(int id) {
        UserAssessment ua = userAssessmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        List<UserAssessmentResponse> responses = userAssessmentResponseRepo.findByUserAssessment_UserAssessmentID(id);

        Set<Integer> questionIds = responses.stream()
                .map(UserAssessmentResponse::getQuestionID)
                .collect(Collectors.toSet());

        Map<Integer, AssessmentQuestion> questionMap = questionRepo.findAllById(questionIds).stream()
                .collect(Collectors.toMap(AssessmentQuestion::getQuestionID, q -> q));

        Map<String, List<UserAssessmentResponse>> grouped = responses.stream()
                .collect(Collectors.groupingBy(UserAssessmentResponse::getSubstance));

        List<Map<String, Object>> substanceResults = new ArrayList<>();

        for (String substance : grouped.keySet()) {
            List<UserAssessmentResponse> subResponses = grouped.get(substance);

            int subScore = subResponses.stream()
                    .filter(r -> !(r.getSubstance().equalsIgnoreCase("Tobacco products") && r.getQuestionID() == 1006))
                    .map(r -> optionRepo.findById(r.getOptionID()).orElse(null))
                    .filter(Objects::nonNull)
                    .mapToInt(opt -> opt.getScore() != null ? opt.getScore() : 0)
                    .sum();

            String recommendation = determineRecommendation(substance, subScore);

            String riskLevel = determineRisk(substance, subScore);

            List<Map<String, Object>> answers = subResponses.stream().map(r -> {
                QuestionOption option = optionRepo.findById(r.getOptionID()).orElse(null);
                AssessmentQuestion question = questionMap.get(r.getQuestionID());

                String questionText = question != null
                        ? question.getQuestionText().replace("[SUBSTANCE]", r.getSubstance())
                        : "Unknown question";

                return Map.<String, Object>of(
                        "question", questionText,
                        "answer", option != null ? option.getOptionText() : "N/A",
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



    public List<QuestionDTO> getInitialQuestionsForAssessment(Integer assessmentID) {
        List<AssessmentQuestion> questions = questionRepo.findByAssessmentIDAndIsInitialQuestionTrue(assessmentID);
        return questions.stream().map(this::convertToDTO).toList();
    }

    public Map<String, Object> getCrafftResultSummary(int userAssessmentId) {
        UserAssessment ua = userAssessmentRepo.findById(userAssessmentId)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));
        Assessment assessment = repository.findById(ua.getAssessmentID())
                .orElse(null);
        return Map.of(
                "assessmentId", ua.getUserAssessmentID(),
                "assessmentName", assessment != null ? assessment.getAssessmentName() : "",
                "completionDate", ua.getCompletionDate(),
                "riskLevel", ua.getRiskLevel(),
                "totalScore", ua.getTotalScore(),
                "recommendation", ua.getRecommendationProvided()
        );
    }

}
