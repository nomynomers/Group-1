package com.example.auth_system.repository;

import com.example.auth_system.entity.Consultant;
import com.example.auth_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConsultantRepository extends JpaRepository<Consultant, Integer> {
    Optional<Consultant> findByUser_UserId(int userId);

    @Query("SELECT c FROM Consultant c WHERE c.available = true ORDER BY c.yearsExperience DESC")
    List<Consultant> findTop3AvailableConsultants(Pageable pageable);

    Optional<Consultant> findByUser(User user);

}
