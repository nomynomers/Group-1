package com.example.auth_system.repository;

import com.example.auth_system.entity.ModuleCompletions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ModuleCompletionRepository extends JpaRepository<ModuleCompletions, Integer> {
    Optional<ModuleCompletions> findByEnrollIdAndModuleID(Integer enrollmentId, Integer moduleID);

    @Query("SELECT COUNT(DISTINCT m.moduleID) " +
            "FROM CourseModule m WHERE m.courseID = :courseId")
    Integer countModulesInCourse(@Param("courseId") Integer courseId);

    @Query("SELECT COUNT(DISTINCT p.moduleID) " +
            "FROM ModuleCompletions p " +
            "JOIN CourseModule m ON p.moduleID = m.moduleID " +
            "WHERE p.enrollId = :enrollId AND m.courseID = :courseId AND p.completionStatus = true")
    Integer countCompletedModules(@Param("enrollId") Integer enrollId, @Param("courseId") Integer courseId);
}

