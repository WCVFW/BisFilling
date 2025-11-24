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
import java.util.Map;
import java.util.HashMap;

import com.calzone.financial.lead.LeadRepository;
import com.calzone.financial.lead.dto.LeadResponse;
import com.calzone.financial.order.OrderRepository;
import com.calzone.financial.casemgmt.CaseRepository;
import com.calzone.financial.lead.Lead;
import com.calzone.financial.order.Order;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final LeadRepository leadRepository;
    private final OrderRepository orderRepository;
    private final CaseRepository caseRepository;

    // Define a constant for the maximum image size (e.g., 5MB)
    private static final long MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

    public AdminService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder,
                        LeadRepository leadRepository, OrderRepository orderRepository, CaseRepository caseRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.leadRepository = leadRepository;
        this.orderRepository = orderRepository;
        this.caseRepository = caseRepository;
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

    @Transactional(readOnly = true)
    public List<User> listLeads() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRoles().stream().anyMatch(role -> "CLIENT".equals(role.getName())))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<LeadResponse> listCrmLeads() {
        return leadRepository.findAll().stream()
                .map(lead -> new LeadResponse(
                        lead.getId(),
                        lead.getName(),
                        lead.getService(),
                        lead.getStatus(),
                        lead.getCreatedAt(),
                        lead.getUpdatedAt()
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalCustomers = userRepository.findAll().stream()
                .filter(u -> u.getRoles().stream().anyMatch(r -> "CLIENT".equals(r.getName())))
                .count();
        long newOrders = orderRepository.count(); // Simplified: total orders
        double salesRevenue = orderRepository.findAll().stream()
                .mapToDouble(Order::getTotalAmount)
                .sum();
        
        stats.put("totalCustomers", totalCustomers);
        stats.put("newOrders", newOrders);
        stats.put("salesRevenue", salesRevenue);
        stats.put("performance", "100%"); // Mock
        return stats;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getEmployeeStats() {
        List<User> allEmployees = listEmployees();
        long total = allEmployees.size();
        long active = allEmployees.stream().filter(User::isEnabled).count();
        long inactive = total - active;
        
        return Map.of(
            "totalEmployees", total,
            "activeEmployees", total, // Mock: assuming all are active for now
            "inactiveEmployees", 0L
        );
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getCustomerLifecycleData() {
        List<User> customers = listLeads(); // Reusing listLeads which returns CLIENT users
        
        long totalCustomers = customers.size();
        long activeCustomers = customers.stream().filter(User::isEnabled).count();
        double totalRevenue = orderRepository.findAll().stream()
                .mapToDouble(Order::getTotalAmount)
                .sum();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCustomers", totalCustomers);
        stats.put("activeCustomers", activeCustomers);
        stats.put("totalRevenue", totalRevenue);
        stats.put("churnRate", "0%"); // Mock

        // Mock chart data
        List<Map<String, Object>> lifecycleData = new java.util.ArrayList<>();
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun"};
        for (String m : months) {
            lifecycleData.add(Map.of(
                "month", m,
                "new", (int)(Math.random() * 10),
                "active", (int)(Math.random() * 50 + 10),
                "churned", (int)(Math.random() * 2)
            ));
        }

        Map<String, Object> response = new HashMap<>();
        // Map customers to a simple map structure
        response.put("customers", customers.stream().map(u -> {
            Map<String, Object> m = new HashMap<>();
            m.put("id", u.getId());
            m.put("name", u.getFullName());
            m.put("email", u.getEmail());
            m.put("phone", u.getPhone());
            m.put("status", u.isEnabled() ? "Active" : "Inactive");
            m.put("revenue", 0); // TODO: calculate per user revenue
            m.put("lastContact", "N/A");
            return m;
        }).toList());
        
        response.put("stats", stats);
        response.put("lifecycleData", lifecycleData);
        
        return response;
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