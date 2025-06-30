package com.example.auth_system.repository;

import com.example.auth_system.entity.Consultant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ConsultantRepository extends JpaRepository<Consultant, Integer> {
    Optional<Consultant> findByUser_UserId(int userId);
}
