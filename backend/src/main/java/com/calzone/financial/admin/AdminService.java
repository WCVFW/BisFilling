package com.calzone.financial.admin;

import com.calzone.financial.user.Role;
import com.calzone.financial.user.RoleRepository;
import com.calzone.financial.user.User;
import com.calzone.financial.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    // Define a constant for the maximum image size (e.g., 5MB)
    private static final long MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

    public AdminService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User createEmployee(String email, String fullName, String phone, String password, String role, String address, MultipartFile profileImageFile) throws IOException {
        User user = new User();
        user.setEmail(email);
        user.setFullName(fullName);
        user.setPhone(phone != null ? phone : "");

        if (password != null && !password.isBlank()) {
            user.setPassword(passwordEncoder.encode(password));
        } else {
            user.setPassword(""); // Set a non-null default
        }

        String roleName = (role == null || role.isBlank()) ? "EMPLOYEE" : role.toUpperCase();
        Role userRole = roleRepository.findByName(roleName).orElseGet(() -> roleRepository.save(new Role(roleName)));
        user.getRoles().add(userRole);

        if (address != null) {
            user.setAddress(address);
        }

        // Validate and set profile image
        validateAndSetImage(user, profileImageFile);

        return userRepository.save(user);
    }

    @Transactional
    public User updateEmployee(Long id, String fullName, String phone, String password, String role, String address, MultipartFile profileImageFile) throws IOException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with id: " + id));

        if (fullName != null) {
            user.setFullName(fullName);
        }
        if (phone != null) {
            user.setPhone(phone);
        }
        if (password != null && !password.isBlank()) {
            user.setPassword(passwordEncoder.encode(password));
        }

        if (role != null && !role.isBlank()) {
            String roleName = role.toUpperCase();
            Role newRole = roleRepository.findByName(roleName).orElseGet(() -> roleRepository.save(new Role(roleName)));
            user.getRoles().clear();
            user.getRoles().add(newRole);
        }

        if (address != null) {
            user.setAddress(address);
        }

        // Validate and set profile image
        validateAndSetImage(user, profileImageFile);

        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<User> listEmployees() {
        return userRepository.findAll().stream()
                .filter(u -> u.getRoles().stream().anyMatch(r -> r.getName().equals("EMPLOYEE") || r.getName().equals("ADMIN")))
                .toList();
    }

    @Transactional
    public void deleteEmployee(Long id) {
        userRepository.deleteById(id);
    }

    private void validateAndSetImage(User user, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            if (imageFile.getSize() > MAX_IMAGE_SIZE_BYTES) {
                throw new IllegalArgumentException("Image size exceeds the limit of 5MB.");
            }
            List<String> allowedTypes = Arrays.asList("image/jpeg", "image/png", "image/gif", "image/svg+xml");
            if (!allowedTypes.contains(imageFile.getContentType())) {
                throw new IllegalArgumentException("Invalid image type. Only JPG, PNG, GIF, or SVG are allowed.");
            }
            user.setProfileImage(imageFile.getBytes());
            user.setProfileImageType(imageFile.getContentType());
        }
    }
}