package com.example.auth_system.service;

import com.example.auth_system.dto.ConsultantDTO;
import com.example.auth_system.dto.ConsultantRequest;
import com.example.auth_system.dto.ConsultantResponse;
import com.example.auth_system.dto.UserProfile;
import com.example.auth_system.entity.Consultant;
import com.example.auth_system.entity.User;
import com.example.auth_system.repository.ConsultantRepository;
import com.example.auth_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
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

    public List<ConsultantDTO> getTop3Consultants() {
        Pageable pageable = PageRequest.of(0, 3);
        return consultantRepository.findTop3AvailableConsultants(pageable)
                .stream()
                .map(c -> new ConsultantDTO(
                        c.getUser().getFullName(),
                        c.getSpecialization(),
                        c.getImageCover(),
                        String.format("With %d years of experience in %s.", c.getYearsExperience(), c.getSpecialization())
                ))
                .toList();
    }

    public ConsultantResponse getConsultantProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Consultant consultant = consultantRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        return ConsultantResponse.fromEntity(consultant);
    }

    private UserProfile mapToProfile(User user) {
        return UserProfile.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .dateOfBirth(user.getDateOfBirth())
                .phoneNumber(user.getPhoneNumber())
                .registrationDate(user.getRegistrationDate())
                .roleName(user.getRole().getRoleName())
                .build();
    }

    public UserProfile getUserById(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToProfile(user);

    }
}
