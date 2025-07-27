package com.example.auth_system.service;

import com.example.auth_system.dto.CourseRequest;
import com.example.auth_system.dto.CreateUserRequest;
import com.example.auth_system.dto.MessageResponse;
import com.example.auth_system.dto.UserProfile;
import com.example.auth_system.entity.Course;
import com.example.auth_system.entity.Roles;
import com.example.auth_system.entity.User;
import com.example.auth_system.repository.CourseRepository;
import com.example.auth_system.repository.RoleRepository;
import com.example.auth_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final RoleRepository roleRepository;

    public List<UserProfile> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToProfile)
                .toList();
    }

    public UserProfile getUserById(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToProfile(user);
    }

    public MessageResponse updateUser(int id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setEmail(updatedUser.getEmail());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setDateOfBirth(updatedUser.getDateOfBirth());

        userRepository.save(user);
        return new MessageResponse("User updated successfully");
    }

    public MessageResponse deleteUser(int id) {
        if (!userRepository.existsById(id)) {
            return new MessageResponse("Error: User not found");
        }
        userRepository.deleteById(id);
        return new MessageResponse("User deleted successfully");
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

    public MessageResponse createUserByAdmin(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new MessageResponse("Error: Email is already taken!");
        }

        Roles role = roleRepository.findByRoleName(request.getRoleName().toUpperCase())
                .orElseThrow(() -> new RuntimeException("Error: Role not found"));

        User newUser = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .dateOfBirth(request.getDateOfBirth())
                .phoneNumber(request.getPhoneNumber())
                .registrationDate(LocalDateTime.now())
                .role(role)
                .accountStatus(true)
                .build();

        userRepository.save(newUser);
        return new MessageResponse("User created successfully");
    }

    public MessageResponse createCourseByAdmin(CourseRequest request) {
        Course newCourse = Course.builder()
                .courseName(request.getCourseName())
                .description(request.getDescription())
                .targetAudience(request.getTargetAudience())
                .durationMinutes(request.getDurationMinutes())
                .imageCover(request.getImageCover())
                .author(request.getAuthor())
                .build();

        courseRepository.save(newCourse);
        return new MessageResponse("Course created successfully");
    }

    public MessageResponse deleteCourse(int id) {
        if (!courseRepository.existsById(id)) {
            return new MessageResponse("Error: Course not found");
        }
        courseRepository.deleteById(id);
        return new MessageResponse("Course deleted successfully");
    }

    public MessageResponse updateCourse(int id, CourseRequest updatedCourse) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setCourseName(updatedCourse.getCourseName());
        course.setDescription(updatedCourse.getDescription());
        course.setTargetAudience(updatedCourse.getTargetAudience());
        course.setDurationMinutes(updatedCourse.getDurationMinutes());
        course.setImageCover(updatedCourse.getImageCover());
        course.setAuthor(updatedCourse.getAuthor());

        courseRepository.save(course);
        return new MessageResponse("Course updated successfully");
    }
}