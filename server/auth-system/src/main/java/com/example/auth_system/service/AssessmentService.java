package com.example.auth_system.service;


import com.example.auth_system.dto.OptionDTO;
import com.example.auth_system.dto.QuestionDTO;
import com.example.auth_system.entity.Assessment;
import com.example.auth_system.entity.AssessmentQuestion;
import com.example.auth_system.repository.AssessmentQuestionRepository;
import com.example.auth_system.repository.AssessmentRepository;
import com.example.auth_system.repository.QuestionOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

}
