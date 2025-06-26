package com.skywings.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class BookingRequest {
    @NotNull
    private Long flightId;

    @NotNull
    private Long seatId;

    @NotBlank
    private String passengerName;

    @NotNull
    @Positive
    private Integer baggageWeight;

    private Boolean isBlocking = false;

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }

    public Long getSeatId() {
        return seatId;
    }

    public void setSeatId(Long seatId) {
        this.seatId = seatId;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public Integer getBaggageWeight() {
        return baggageWeight;
    }

    public void setBaggageWeight(Integer baggageWeight) {
        this.baggageWeight = baggageWeight;
    }

    public Boolean getIsBlocking() {
        return isBlocking;
    }

    public void setIsBlocking(Boolean isBlocking) {
        this.isBlocking = isBlocking;
    }
}