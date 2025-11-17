package com.calzone.financial.auth.dto;

// This is a Data Transfer Object (DTO) to safely send user info to the frontend.
// It matches the data your React component needs.
public class UserProfile {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String profileImagePath;

    public UserProfile(Long id, String fullName, String email, String phone, String profileImagePath) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.profileImagePath = profileImagePath;
    }

    // Getters are needed for Spring to serialize this object to JSON
    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getProfileImagePath() {
        return profileImagePath;
    }
}