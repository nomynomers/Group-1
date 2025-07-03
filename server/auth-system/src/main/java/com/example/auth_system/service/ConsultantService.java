package com.example.auth_system.service;

import com.example.auth_system.dto.ConsultantRequest;
import com.example.auth_system.entity.Consultant;
import com.example.auth_system.entity.User;
import com.example.auth_system.repository.ConsultantRepository;
import com.example.auth_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultantService {
    private final ConsultantRepository consultantRepository;
    private final UserRepository userRepository;

    // CREATE
    public Consultant create(ConsultantRequest request) {
        User user = userRepository.findById(request.getUserID())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Consultant consultant = Consultant.builder()
                .user(user)
                .specialization(request.getSpecialization())
                .qualification(request.getQualification())
                .yearsExperience(request.getYearsExperience())
                .available(request.isAvailable())
                .imageCover(request.getImageCover())
                .build();

        return consultantRepository.save(consultant);
    }

    // UPDATE
    @Transactional
    public Consultant update(int id, ConsultantRequest request) {
        Consultant consultant = consultantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        if (request.getUserID() != 0 && request.getUserID() != consultant.getUser().getUserId()) {
            consultant.setUser(userRepository.findById(request.getUserID())
                    .orElseThrow(() -> new RuntimeException("User not found")));
        }

        consultant.setSpecialization(request.getSpecialization());
        consultant.setQualification(request.getQualification());
        consultant.setYearsExperience(request.getYearsExperience());
        consultant.setAvailable(request.isAvailable());
        consultant.setImageCover(request.getImageCover());

        return consultantRepository.save(consultant);
    }

    // DELETE
    @Transactional
    public void delete(int id) {
        Consultant consultant = consultantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultant not found"));
        consultantRepository.delete(consultant);
    }

    // GET BY ID
    public Consultant getById(int id) {
        Consultant consultant = consultantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        // Force fetch user to avoid lazy loading issues
        consultant.getUser().getFirstName(); // Touch the user
        return consultant;
    }

    // GET ALL
    public List<Consultant> getAll() {
        List<Consultant> consultants = consultantRepository.findAll();
        consultants.forEach(c -> {
            if (c.getUser() != null) {
                c.getUser().getFirstName(); // Force load
            }
        });
        return consultants;
    }

    public int getConsultantIdByUserId(int userId) {
        Consultant consultant = consultantRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Consultant not found with userId: " + userId));
        return consultant.getConsultantID();
    }
}
