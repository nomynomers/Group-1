package com.example.auth_system.controller;

import com.example.auth_system.dto.MessageResponse;
import com.example.auth_system.dto.UserProfile;
import com.example.auth_system.entity.User;
import com.example.auth_system.service.AdminService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public List<UserProfile> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public UserProfile getUser(@PathVariable int id) {
        return adminService.getUserById(id);
    }

    @PutMapping("/users/{id}")
    public MessageResponse updateUser(@PathVariable int id, @Valid @RequestBody User updatedUser) {
        return adminService.updateUser(id, updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public MessageResponse deleteUser(@PathVariable int id) {
        return adminService.deleteUser(id);
    }
}