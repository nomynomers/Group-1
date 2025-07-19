package com.example.auth_system.controller;

import com.example.auth_system.dto.CourseRequest;
import com.example.auth_system.dto.CreateUserRequest;
import com.example.auth_system.dto.MessageResponse;
import com.example.auth_system.dto.UserProfile;
import com.example.auth_system.entity.Course;
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
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
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

    @PostMapping("/users/create")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserRequest request) {
        try {
            MessageResponse response = adminService.createUserByAdmin(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PostMapping("/courses/create")
    public ResponseEntity<?> createCourse(@Valid @RequestBody CourseRequest request) {
        try {
            MessageResponse response = adminService.createCourseByAdmin(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @DeleteMapping("/courses/{id}")
    public MessageResponse deleteCourse(@PathVariable int id) {
        return adminService.deleteCourse(id);
    }

    @PutMapping("/courses/{id}")
    public MessageResponse updateCourse(@PathVariable int id, @Valid @RequestBody CourseRequest updatedCourse) {
        return adminService.updateCourse(id, updatedCourse);
    }

}