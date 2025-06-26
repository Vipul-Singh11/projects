package com.skywings.dto;

import java.time.LocalDateTime;

public class FlightSearchRequest {
    private String origin;
    private String destination;
    private LocalDateTime departureDate;
    private LocalDateTime returnDate;
    private Integer passengers;

    // Constructors
    public FlightSearchRequest() {}

    public FlightSearchRequest(String origin, String destination, LocalDateTime departureDate) {
        this.origin = origin;
        this.destination = destination;
        this.departureDate = departureDate;
    }

    // Getters and Setters
    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public LocalDateTime getDepartureDate() { return departureDate; }
    public void setDepartureDate(LocalDateTime departureDate) { this.departureDate = departureDate; }

    public LocalDateTime getReturnDate() { return returnDate; }
    public void setReturnDate(LocalDateTime returnDate) { this.returnDate = returnDate; }

    public Integer getPassengers() { return passengers; }
    public void setPassengers(Integer passengers) { this.passengers = passengers; }
}