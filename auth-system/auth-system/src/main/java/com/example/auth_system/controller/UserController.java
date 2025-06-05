package com.example.auth_system.controller;

import com.example.auth_system.dto.CreateUserRequest;
import com.example.auth_system.dto.MessageResponse;
import com.example.auth_system.dto.UpdateProfileRequest;
import com.example.auth_system.dto.UserProfile;
import com.example.auth_system.entity.User;
import com.example.auth_system.service.AuthService;
import com.example.auth_system.service.UserDetailsServiceImpl;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "*", maxAge = 3600)
@Validated
public class UserController {

    @Autowired
    private AuthService authService;
    @GetMapping("/profile")
    @PreAuthorize("hasRole('User') or hasRole('Admin')")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        try {
            String email = authentication.getName();
            UserProfile profile = authService.getUserProfile(email);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('User') or hasRole('Admin')")
    public ResponseEntity<?> updateUserProfile(@Valid @RequestBody UpdateProfileRequest request,
                                               Authentication authentication) {
        try {
            String email = authentication.getName();
            MessageResponse response = authService.updateUserProfile(email, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserRequest request) {
        try {
            MessageResponse response = authService.createUserByAdmin(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> deleteUser(@PathVariable int userId) {
        try {
            MessageResponse response = authService.deleteUserById(userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }


}
