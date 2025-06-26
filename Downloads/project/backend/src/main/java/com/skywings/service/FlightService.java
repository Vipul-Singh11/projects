package com.skywings.service;

import com.skywings.dto.FlightSearchRequest;
import com.skywings.model.Flight;
import com.skywings.model.Seat;
import com.skywings.repository.FlightRepository;
import com.skywings.repository.SeatRepository;
import com.skywings.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class FlightService {
    
    @Autowired
    private FlightRepository flightRepository;
    
    @Autowired
    private SeatRepository seatRepository;
    
    @Autowired
    private SeatService seatService;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Flight getFlightById(Long id) {
        return flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found with id: " + id));
    }

    public List<Flight> searchFlights(FlightSearchRequest searchRequest) {
        return flightRepository.searchFlights(
                searchRequest.getOrigin(),
                searchRequest.getDestination(),
                searchRequest.getDepartureDate()
        );
    }

    public Flight createFlight(Flight flight) {
        // Calculate duration
        Duration duration = Duration.between(flight.getDepartureTime(), flight.getArrivalTime());
        long hours = duration.toHours();
        long minutes = duration.toMinutes() % 60;
        flight.setDuration(String.format("%dh %dm", hours, minutes));
        
        flight.setAvailableSeats(flight.getTotalSeats());
        
        Flight savedFlight = flightRepository.save(flight);
        
        // Generate seats for the flight
        seatService.generateSeatsForFlight(savedFlight);
        
        return savedFlight;
    }

    public Flight updateFlight(Long id, Flight flightDetails) {
        Flight flight = getFlightById(id);
        
        flight.setFlightNumber(flightDetails.getFlightNumber());
        flight.setAirline(flightDetails.getAirline());
        flight.setOrigin(flightDetails.getOrigin());
        flight.setDestination(flightDetails.getDestination());
        flight.setDepartureTime(flightDetails.getDepartureTime());
        flight.setArrivalTime(flightDetails.getArrivalTime());
        flight.setPrice(flightDetails.getPrice());
        flight.setAircraft(flightDetails.getAircraft());
        flight.setStatus(flightDetails.getStatus());
        
        // Recalculate duration
        Duration duration = Duration.between(flight.getDepartureTime(), flight.getArrivalTime());
        long hours = duration.toHours();
        long minutes = duration.toMinutes() % 60;
        flight.setDuration(String.format("%dh %dm", hours, minutes));
        
        return flightRepository.save(flight);
    }

    public void deleteFlight(Long id) {
        Flight flight = getFlightById(id);
        flightRepository.delete(flight);
    }

    public List<Seat> getFlightSeats(Long flightId) {
        Flight flight = getFlightById(flightId);
        return seatRepository.findByFlightOrderBySeatRowAscSeatColumnAsc(flight);
    }

    public void updateAvailableSeats(Long flightId) {
        Flight flight = getFlightById(flightId);
        Integer availableSeats = seatRepository.countAvailableSeatsByFlight(flight);
        flight.setAvailableSeats(availableSeats);
        flightRepository.save(flight);
    }
}