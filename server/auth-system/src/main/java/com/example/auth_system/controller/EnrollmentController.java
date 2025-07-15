package com.example.auth_system.controller;

import com.example.auth_system.dto.EnrollmentRequest;
import com.example.auth_system.entity.Course;
import com.example.auth_system.entity.User;
import com.example.auth_system.service.EnrollmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enroll")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<Integer> enroll(@RequestBody EnrollmentRequest request) {
        Integer enrollId = enrollmentService.enrollUser(request);
        return ResponseEntity.ok(enrollId);
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkEnrollment(
            @RequestParam("courseID") int courseID,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        boolean enrolled = enrollmentService.isUserEnrolled(userDetails.getUsername(), courseID);
        return ResponseEntity.ok(enrolled);
    }

    // Controller
    @GetMapping("/user")
    public ResponseEntity<List<Course>> getUserEnrolledCourses(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<Course> courses = enrollmentService.getCoursesByUsername(userDetails.getUsername());
        return ResponseEntity.ok(courses);
    }


}
