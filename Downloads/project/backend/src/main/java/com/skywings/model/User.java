package com.skywings.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    @NotBlank
    @Size(max = 50)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    private String lastName;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Enumerated(EnumType.STRING)
    private LoyaltyTier loyaltyTier = LoyaltyTier.BRONZE;

    private Integer totalFlights = 0;

    @Column(name = "member_since")
    private LocalDateTime memberSince;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings;

    // Constructors
    public User() {
        this.memberSince = LocalDateTime.now();
    }

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.memberSince = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public LoyaltyTier getLoyaltyTier() { return loyaltyTier; }
    public void setLoyaltyTier(LoyaltyTier loyaltyTier) { this.loyaltyTier = loyaltyTier; }

    public Integer getTotalFlights() { return totalFlights; }
    public void setTotalFlights(Integer totalFlights) { this.totalFlights = totalFlights; }

    public LocalDateTime getMemberSince() { return memberSince; }
    public void setMemberSince(LocalDateTime memberSince) { this.memberSince = memberSince; }

    public List<Booking> getBookings() { return bookings; }
    public void setBookings(List<Booking> bookings) { this.bookings = bookings; }

    public enum Role {
        USER, ADMIN
    }

    public enum LoyaltyTier {
        BRONZE, SILVER, GOLD, PLATINUM
    }
}