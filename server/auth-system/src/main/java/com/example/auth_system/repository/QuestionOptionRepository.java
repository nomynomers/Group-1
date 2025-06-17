package com.example.auth_system.repository;

import com.example.auth_system.entity.QuestionOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionOptionRepository extends JpaRepository<QuestionOption, Integer> {
}
