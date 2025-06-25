package com.example.auth_system.repository;

import com.example.auth_system.entity.UserCourseProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCourseProgressRepository extends JpaRepository<UserCourseProgress, Integer> {
    Optional<UserCourseProgress> findByEnrollIdAndModuleID(Integer enrollId, Integer moduleID);
}

