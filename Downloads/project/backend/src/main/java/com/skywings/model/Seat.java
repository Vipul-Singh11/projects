package com.skywings.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "seats")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Integer seatRow;

    @NotNull
    private String seatColumn;

    @Enumerated(EnumType.STRING)
    private SeatType type;

    private BigDecimal upgradePrice = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    private SeatStatus status = SeatStatus.AVAILABLE;

    @ElementCollection
    @CollectionTable(name = "seat_features", joinColumns = @JoinColumn(name = "seat_id"))
    @Column(name = "feature")
    private List<String> features;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id")
    private Flight flight;

    @OneToMany(mappedBy = "seat", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings;

    // Constructors
    public Seat() {}

    public Seat(Integer seatRow, String seatColumn, SeatType type, BigDecimal upgradePrice, Flight flight) {
        this.seatRow = seatRow;
        this.seatColumn = seatColumn;
        this.type = type;
        this.upgradePrice = upgradePrice;
        this.flight = flight;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getSeatRow() { return seatRow; }
    public void setSeatRow(Integer seatRow) { this.seatRow = seatRow; }

    public String getSeatColumn() { return seatColumn; }
    public void setSeatColumn(String seatColumn) { this.seatColumn = seatColumn; }

    public SeatType getType() { return type; }
    public void setType(SeatType type) { this.type = type; }

    public BigDecimal getUpgradePrice() { return upgradePrice; }
    public void setUpgradePrice(BigDecimal upgradePrice) { this.upgradePrice = upgradePrice; }

    public SeatStatus getStatus() { return status; }
    public void setStatus(SeatStatus status) { this.status = status; }

    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }

    public Flight getFlight() { return flight; }
    public void setFlight(Flight flight) { this.flight = flight; }

    public List<Booking> getBookings() { return bookings; }
    public void setBookings(List<Booking> bookings) { this.bookings = bookings; }

    public enum SeatType {
        ECONOMY, BUSINESS, FIRST
    }

    public enum SeatStatus {
        AVAILABLE, OCCUPIED, BLOCKED, SELECTED
    }
}