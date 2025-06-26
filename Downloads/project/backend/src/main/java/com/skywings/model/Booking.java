package com.skywings.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String passengerName;

    @NotNull
    private LocalDateTime bookingDate;

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.CONFIRMED;

    @NotNull
    @Positive
    private BigDecimal totalAmount;

    @NotNull
    private BigDecimal paidAmount;

    private BigDecimal remainingAmount = BigDecimal.ZERO;

    private Integer baggageWeight = 0;
    private Integer extraBaggageWeight = 0;
    private BigDecimal baggageCharges = BigDecimal.ZERO;

    private Integer discountApplied = 0;

    private LocalDateTime paymentDueDate;

    private Boolean isBlocking = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id")
    private Flight flight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seat_id")
    private Seat seat;

    // Constructors
    public Booking() {
        this.bookingDate = LocalDateTime.now();
    }

    public Booking(String passengerName, BigDecimal totalAmount, BigDecimal paidAmount,
                   User user, Flight flight, Seat seat) {
        this.passengerName = passengerName;
        this.totalAmount = totalAmount;
        this.paidAmount = paidAmount;
        this.user = user;
        this.flight = flight;
        this.seat = seat;
        this.bookingDate = LocalDateTime.now();
        this.remainingAmount = totalAmount.subtract(paidAmount);
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPassengerName() { return passengerName; }
    public void setPassengerName(String passengerName) { this.passengerName = passengerName; }

    public LocalDateTime getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public BigDecimal getPaidAmount() { return paidAmount; }
    public void setPaidAmount(BigDecimal paidAmount) { this.paidAmount = paidAmount; }

    public BigDecimal getRemainingAmount() { return remainingAmount; }
    public void setRemainingAmount(BigDecimal remainingAmount) { this.remainingAmount = remainingAmount; }

    public Integer getBaggageWeight() { return baggageWeight; }
    public void setBaggageWeight(Integer baggageWeight) { this.baggageWeight = baggageWeight; }

    public Integer getExtraBaggageWeight() { return extraBaggageWeight; }
    public void setExtraBaggageWeight(Integer extraBaggageWeight) { this.extraBaggageWeight = extraBaggageWeight; }

    public BigDecimal getBaggageCharges() { return baggageCharges; }
    public void setBaggageCharges(BigDecimal baggageCharges) { this.baggageCharges = baggageCharges; }

    public Integer getDiscountApplied() { return discountApplied; }
    public void setDiscountApplied(Integer discountApplied) { this.discountApplied = discountApplied; }

    public LocalDateTime getPaymentDueDate() { return paymentDueDate; }
    public void setPaymentDueDate(LocalDateTime paymentDueDate) { this.paymentDueDate = paymentDueDate; }

    public Boolean getIsBlocking() { return isBlocking; }
    public void setIsBlocking(Boolean isBlocking) { this.isBlocking = isBlocking; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Flight getFlight() { return flight; }
    public void setFlight(Flight flight) { this.flight = flight; }

    public Seat getSeat() { return seat; }
    public void setSeat(Seat seat) { this.seat = seat; }

    public enum BookingStatus {
        CONFIRMED, PENDING, CANCELLED, BLOCKED
    }
}