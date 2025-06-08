package com.example.auth_system.service;

import com.example.auth_system.dto.CreateUserRequest;
import com.example.auth_system.dto.MessageResponse;
import com.example.auth_system.dto.UserProfile;
import com.example.auth_system.entity.Role;
import com.example.auth_system.entity.User;
import com.example.auth_system.repository.RoleRepository;
import com.example.auth_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    public List<UserProfile> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToProfile)
                .toList();
    }

    public UserProfile getUserById(int id) {
        User user = userRepository.findById(String.valueOf(id))
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToProfile(user);
    }

    public MessageResponse updateUser(int id, User updatedUser) {
        User user = userRepository.findById(String.valueOf(id))
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setDateOfBirth(updatedUser.getDateOfBirth());

        userRepository.save(user);
        return new MessageResponse("User updated successfully");
    }

    public MessageResponse deleteUser(int id) {
        userRepository.deleteById(String.valueOf(id));
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
<<<<<<< HEAD
=======

    public MessageResponse createUserByAdmin(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new MessageResponse("Error: Email is already taken!");
        }

        Role role = roleRepository.findByRoleName(request.getRoleName().toUpperCase())
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
                .build();

        userRepository.save(newUser);

        return new MessageResponse("User created successfully");
    }

>>>>>>> long2
}
