package com.calzone.financial.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.calzone.financial.email.EmailVerificationService;
import com.calzone.financial.user.User;
import com.calzone.financial.user.UserRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class AuthService {

    private static final Logger LOGGER = Logger.getLogger(AuthService.class.getName());

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final EmailVerificationService emailVerificationService;

    public AuthService(UserRepository userRepository, PasswordEncoder encoder, JwtService jwtService,
            EmailVerificationService emailVerificationService) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtService = jwtService;
        this.emailVerificationService = emailVerificationService;
    }

    public Map<String, Object> register(String email, String password, String fullName, String phone, MultipartFile profileImage) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email exists");
        }
        
        String hash = encoder.encode(password);
        User u = User.builder()
                .email(email)
                .password(hash)
                .fullName(fullName)
                .phone(phone)
                .emailVerified(false) // Set emailVerified to false on registration
                .build();

        // Handle profile image by storing bytes in the user entity
        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                u.setProfileImage(profileImage.getBytes());
                u.setProfileImageType(profileImage.getContentType());
                LOGGER.info(() -> "Profile image being stored for user: " + email);
            } catch (IOException e) {
                LOGGER.warning(() -> "Failed to process profile image for user " + email + ": " + e.getMessage());
                // Continue registration even if image processing fails
            }
        } else {
            LOGGER.info(() -> "No profile image provided for user: " + email);
        }

        userRepository.save(u);
        emailVerificationService.sendCode(email); // Send Verification Email

        Map<String, Object> res = new HashMap<>();
        res.put("message", "User registered. Please verify your email to activate the account.");
        res.put("email", u.getEmail());
        return res;
    }

    public Map<String, Object> login(String email, String password) {
        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!encoder.matches(password, u.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        if (!u.getEmailVerified()) {
            throw new IllegalArgumentException("Email not verified. Please verify your email before logging in.");
        }

        String token = jwtService.generateToken(u);
        Map<String, Object> res = new HashMap<>();
        String role = "USER";
        if (u.getRoles() != null && !u.getRoles().isEmpty()) {
            role = u.getRoles().iterator().next().getName();
        }

        res.put("token", token);
        res.put("user", Map.of(
                "id", u.getId(),
                "fullName", u.getFullName(),
                "email", u.getEmail(),
                "phone", u.getPhone(),
                "role", role,
                "hasProfileImage", u.hasProfileImage() // Use the boolean helper method
        ));
        return res;
    }
}
