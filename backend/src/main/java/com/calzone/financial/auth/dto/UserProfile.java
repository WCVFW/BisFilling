package com.calzone.financial.auth.dto;

// This is a Data Transfer Object (DTO) to safely send user info to the frontend.
// It matches the data your React component needs.
public class UserProfile {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private boolean hasProfileImage; // Changed from String to boolean

    public UserProfile(Long id, String fullName, String email, String phone, boolean hasProfileImage) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.hasProfileImage = hasProfileImage;
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

    public boolean getHasProfileImage() { // Renamed getter for clarity
        return hasProfileImage;
    }
}