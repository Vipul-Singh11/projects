package com.skywings.dto;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String loyaltyTier;

    public JwtResponse(String accessToken, Long id, String email, String firstName, String lastName, String role, String loyaltyTier) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.loyaltyTier = loyaltyTier;
    }

    // Getters and Setters
    public String getAccessToken() { return token; }
    public void setAccessToken(String accessToken) { this.token = accessToken; }

    public String getTokenType() { return type; }
    public void setTokenType(String tokenType) { this.type = tokenType; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getLoyaltyTier() { return loyaltyTier; }
    public void setLoyaltyTier(String loyaltyTier) { this.loyaltyTier = loyaltyTier; }
}