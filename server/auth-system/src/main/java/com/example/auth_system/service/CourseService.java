package com.example.auth_system.service;

import com.example.auth_system.entity.Course;
import com.example.auth_system.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(int id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with ID = " + id));
    }

    public List<Course> getTop3Courses() {
        return courseRepository.findTop3ByOrderByCreationDateDesc();
    }

    public List<Course> getCoursesByAudience(String audience) {
        if ("All Levels".equalsIgnoreCase(audience)) {
            return getAllCourses();
        }
        return courseRepository.findByTargetAudience(audience);
    }

    public List<Course> filterCourses(String audience, String keyword) {
        if ((audience == null || audience.equalsIgnoreCase("All Levels")) && (keyword == null || keyword.isEmpty())) {
            return courseRepository.findAll();
        }

        if ((audience == null || audience.equalsIgnoreCase("All Levels"))) {
            return courseRepository.findByCourseNameContainingIgnoreCase(keyword);
        }

        if (keyword == null || keyword.isEmpty()) {
            return courseRepository.findByTargetAudience(audience);
        }

        return courseRepository.findByTargetAudienceAndCourseNameContainingIgnoreCase(audience, keyword);
    }


}
