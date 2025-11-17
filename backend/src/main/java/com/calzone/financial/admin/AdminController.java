package com.calzone.financial.admin;

import com.calzone.financial.user.User;
import com.calzone.financial.user.UserRepository;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final UserRepository users;
    private final AdminService adminService;

    public AdminController(UserRepository users, AdminService adminService) {
        this.users = users;
        this.adminService = adminService;
    }

    public record EmployeeDto(Long id, String fullName, String email, String phone, java.util.List<String> roles, String role, String address, boolean hasProfileImage) {}

    private static EmployeeDto toDto(User u) {
        java.util.List<String> roleNames = u.getRoles() == null ? java.util.List.of() : u.getRoles().stream().map(r -> r.getName()).toList();
        String primaryRole = roleNames.isEmpty() ? "USER" : roleNames.get(0);
        return new EmployeeDto(u.getId(), u.getFullName(), u.getEmail(), u.getPhone(), roleNames, primaryRole, u.getAddress(), u.hasProfileImage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/employees")
    public ResponseEntity<?> createEmployee(
            @RequestParam("email") @Email String email,
            @RequestParam(value = "phone", required = false) String phone,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "password", required = false) String password,
            @RequestParam("fullName") @NotBlank String fullName,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImageFile
    ) {
        try {
            String phoneVal = phone != null && !phone.isBlank() ? phone : (mobile != null ? mobile : "");
            User createdUser = adminService.createEmployee(email, fullName, phoneVal, password, role, address, profileImageFile);
            return ResponseEntity.ok(java.util.Map.of("id", createdUser.getId()));
        } catch (java.io.IOException e) {
            return ResponseEntity.status(500).body(Map.of("message", "Failed to process image file."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/employees")
    public java.util.List<EmployeeDto> listEmployees() {
        // Return users that have ADMIN or EMPLOYEE role (so admin can see employees and admins)
        return users.findAll().stream()
                .filter(u -> u.getRoles().stream().anyMatch(r -> r.getName().equals("EMPLOYEE") || r.getName().equals("ADMIN")))
                .map(AdminController::toDto)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeDto> getEmployee(@PathVariable Long id) {
        return users.findById(id).map(u -> ResponseEntity.ok(toDto(u))).orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/employees/{id}")
    public ResponseEntity<?> updateEmployee(
            @PathVariable Long id,
            @RequestParam(value = "fullName", required = false) String fullName,
            @RequestParam(value = "phone", required = false) String phone,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "password", required = false) String password,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImageFile
    ) {
        try {
            String phoneVal = phone != null ? phone : mobile;
            User updatedUser = adminService.updateEmployee(id, fullName, phoneVal, password, role, address, profileImageFile);
            return ResponseEntity.ok(java.util.Map.of("id", updatedUser.getId()));
        } catch (java.io.IOException e) {
            return ResponseEntity.status(500).body(Map.of("message", "Failed to process image file."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        users.findById(id).ifPresent(u -> users.delete(u));
        return ResponseEntity.noContent().build();
    }
}
