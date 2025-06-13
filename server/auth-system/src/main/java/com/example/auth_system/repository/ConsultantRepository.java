package com.example.auth_system.repository;

import com.example.auth_system.entity.Consultant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultantRepository extends JpaRepository<Consultant, Integer> {
}
