package com.calzone.financial.user;

import com.calzone.financial.auth.dto.UserProfile;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final com.calzone.financial.user.UserRepository userRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    public UserController(com.calzone.financial.user.UserRepository userRepository,
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@AuthenticationPrincipal User user) {
        // Returns 401 if the JWT token is missing or invalid.
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthenticated"));
        }

        // Fetch all users and convert to UserProfile DTOs
        List<UserProfile> users = userRepository.findAll().stream()
                .map(u -> new UserProfile(u.getId(), u.getFullName(), u.getEmail(), u.getPhone(), u.hasProfileImage()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(Map.of("users", users));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal User user) {
        // Returns 401 if the JWT token is missing or invalid.
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthenticated"));
        }

        // Constructs the profile DTO from the authenticated user.
        UserProfile profile = new UserProfile(user.getId(), user.getFullName(), user.getEmail(), user.getPhone(), user.hasProfileImage());
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/me/profile-image")
    public ResponseEntity<Resource> getProfileImage(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        if (user.getProfileImage() == null || user.getProfileImage().length == 0) {
            return ResponseEntity.notFound().build();
        }

        ByteArrayResource resource = new ByteArrayResource(user.getProfileImage());
        MediaType mediaType;
        try {
            mediaType = MediaType.parseMediaType(user.getProfileImageType());
        } catch (Exception e) {
            mediaType = MediaType.APPLICATION_OCTET_STREAM; // Fallback
        }

        return ResponseEntity.ok().contentType(mediaType).body(resource);
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMe( // Changed from @RequestBody to @RequestParam
            @AuthenticationPrincipal User user,
            @RequestParam(value = "fullName", required = false) String fullName,
            @RequestParam(value = "phone", required = false) String phone,
            @RequestParam(value = "password", required = false) String password,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthenticated"));
        }

        boolean changed = false;

        // Handle profile image update by storing bytes in the database
        if (profileImage != null && !profileImage.isEmpty()) {
            // Basic validation for content type
            List<String> allowedTypes = Arrays.asList("image/jpeg", "image/png", "image/gif", "image/svg+xml");
            if (!allowedTypes.contains(profileImage.getContentType())) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid image type. Only JPG, PNG, GIF, SVG are allowed."));
            }

            try {
                user.setProfileImage(profileImage.getBytes());
                user.setProfileImageType(profileImage.getContentType());
                changed = true;
            } catch (IOException e) {
                // Log the error and inform the user
                return ResponseEntity.status(500).body(Map.of("message", "Failed to process image file."));
            }
        }

        if (fullName != null) {
            user.setFullName(fullName.trim());
            changed = true;
        }
        if (phone != null) {
            user.setPhone(phone.trim());
            changed = true;
        }

        if (password != null && !password.isBlank()) {
            // IMPORTANT: Passwords must be encoded before saving.
            user.setPassword(passwordEncoder.encode(password));
            changed = true;
        }

        if (changed) {
            // Saves the changes to the user that was retrieved from the security context.
            userRepository.save(user);
        }

        // Return the same UserProfile DTO for consistency with the GET /me endpoint.
        UserProfile profile = new UserProfile(user.getId(), user.getFullName(), user.getEmail(), user.getPhone(), user.hasProfileImage());
        return ResponseEntity.ok(Map.of("user", profile, "message", "Profile updated successfully"));
    }
}
