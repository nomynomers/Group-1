package com.example.auth_system.repository;

import com.example.auth_system.entity.UserCourseProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCourseProgressRepository extends JpaRepository<UserCourseProgress, Integer> {
    Optional<UserCourseProgress> findByEnrollIdAndModuleID(Integer enrollId, Integer moduleID);

    @Query("SELECT COUNT(DISTINCT m.moduleID) " +
            "FROM CourseModule m WHERE m.courseID = :courseId")
    Integer countModulesInCourse(@Param("courseId") Integer courseId);

    @Query("SELECT COUNT(DISTINCT p.moduleID) " +
            "FROM UserCourseProgress p " +
            "JOIN CourseModule m ON p.moduleID = m.moduleID " +
            "WHERE p.enrollId = :enrollId AND m.courseID = :courseId AND p.completionStatus = true")
    Integer countCompletedModules(@Param("enrollId") Integer enrollId, @Param("courseId") Integer courseId);
}

