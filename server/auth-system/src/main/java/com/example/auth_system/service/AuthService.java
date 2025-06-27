package com.example.auth_system.service;

import com.example.auth_system.config.JwtUtils;
import com.example.auth_system.config.UserPrincipal;
import com.example.auth_system.dto.*;
import com.example.auth_system.entity.Roles;
import com.example.auth_system.entity.User;
import com.example.auth_system.repository.RoleRepository;
import com.example.auth_system.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private EmailService emailService;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        log.info(" Attempting login for: {}", loginRequest.getEmail());

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            log.info(" Authenticated: {}", authentication.isAuthenticated());

            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            log.info("UserPrincipal loaded: email={}, password={}, authorities={}",
                    userPrincipal.getEmail(),
                    userPrincipal.getPassword(),
                    userPrincipal.getAuthorities());

            String jwt = jwtUtils.generateJwtToken(userPrincipal);

            // Get the role name from authorities
            String roleName = userPrincipal.getAuthorities().stream()
                    .findFirst()
                    .map(authority -> authority.getAuthority().replace("ROLE_", ""))
                    .orElse("USER");

            return JwtResponse.builder()
                    .token(jwt)
                    .type("Bearer")
                    .id(String.valueOf(userPrincipal.getId()))
                    .email(userPrincipal.getEmail())
                    .firstName(userPrincipal.getFirstName())
                    .lastName(userPrincipal.getLastName())
                    .roleName(roleName)
                    .build();

        } catch (Exception e) {
            log.error(" Login failed: {}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public MessageResponse registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already taken!");
        }

        Roles userRole = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        User user = User.builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .firstName(signUpRequest.getFirstName())
                .lastName(signUpRequest.getLastName())
                .dateOfBirth(signUpRequest.getDateOfBirth())
                .phoneNumber(signUpRequest.getPhoneNumber())
                .registrationDate(null) // will be set by @PrePersist
                .role(userRole)
                .build();

        userRepository.save(user);
        emailService.sendRegistrationSuccessEmail(user.getEmail(), user.getFirstName());

        return new MessageResponse("User registered successfully!");
    }

    public UserProfile getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

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

    public MessageResponse updateUserProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setPhoneNumber(request.getPhoneNumber());

        userRepository.save(user);

        return new MessageResponse("Profile updated successfully!");
    }
}
