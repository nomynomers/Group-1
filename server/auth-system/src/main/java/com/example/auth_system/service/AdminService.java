package com.example.auth_system.service;

import com.example.auth_system.dto.MessageResponse;
import com.example.auth_system.dto.UserProfile;
import com.example.auth_system.entity.User;
import com.example.auth_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

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
}
