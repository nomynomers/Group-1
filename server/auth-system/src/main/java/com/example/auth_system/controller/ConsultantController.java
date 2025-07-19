package com.example.auth_system.controller;

import com.example.auth_system.dto.ConsultantDTO;
import com.example.auth_system.dto.ConsultantRequest;
import com.example.auth_system.dto.ConsultantResponse;
import com.example.auth_system.dto.UserProfile;
import com.example.auth_system.entity.Consultant;
import com.example.auth_system.service.ConsultantService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/consultants")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth") //
//
public class ConsultantController {

    private final ConsultantService consultantService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody ConsultantRequest request) {
        try {
            Consultant consultant = consultantService.create(request);
            return ResponseEntity.ok(ConsultantResponse.fromEntity(consultant));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('CONSULTANT')")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody ConsultantRequest request) {
        try {
            Consultant updated = consultantService.update(id, request);
            return ResponseEntity.ok(ConsultantResponse.fromEntity(updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            consultantService.delete(id);
            return ResponseEntity.ok("Deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        try {
            Consultant consultant = consultantService.getById(id);
            return ResponseEntity.ok(ConsultantResponse.fromEntity(consultant));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Consultant> consultants = consultantService.getAll();
        List<ConsultantResponse> responses = consultants.stream()
                .map(ConsultantResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Integer> getConsultantIdByUserId(@PathVariable int userId) {
        int consultantId = consultantService.getConsultantIdByUserId(userId);
        return ResponseEntity.ok(consultantId);
    }

    @GetMapping("/top3")
    public ResponseEntity<List<ConsultantDTO>> getTop3Consultants() {
        return ResponseEntity.ok(consultantService.getTop3Consultants());
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('CONSULTANT')")
    public ResponseEntity<?> getLoggedInConsultantProfile(Principal principal) {
        try {
            ConsultantResponse response = consultantService.getConsultantProfile(principal.getName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('CONSULTANT')")
    @GetMapping("/user-info/{id}")
    public UserProfile getUser(@PathVariable int id) {
        return consultantService.getUserById(id);
    }

}
