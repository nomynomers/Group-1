package com.example.auth_system.repository;

import com.example.auth_system.entity.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseModuleRepository extends JpaRepository<CourseModule, Integer> {
    List<CourseModule> findByCourseID(Integer courseID);
}
