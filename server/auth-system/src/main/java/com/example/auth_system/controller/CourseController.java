package com.example.auth_system.controller;

import com.example.auth_system.entity.Course;
import com.example.auth_system.service.CourseService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable int id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @GetMapping("/top3")
    public ResponseEntity<List<Course>> getTop3Courses() {
        return ResponseEntity.ok(courseService.getTop3Courses());
    }

    @GetMapping("/filter")
    public List<Course> filterCourses(
            @RequestParam(required = false) String audience,
            @RequestParam(required = false) String keyword
    ) {
        return courseService.filterCourses(audience, keyword);
    }


}
