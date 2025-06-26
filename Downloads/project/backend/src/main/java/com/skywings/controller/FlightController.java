package com.skywings.controller;

import com.skywings.dto.FlightSearchRequest;
import com.skywings.model.Flight;
import com.skywings.service.FlightService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/flights")
public class FlightController {
    
    @Autowired
    private FlightService flightService;

    @GetMapping
    public ResponseEntity<List<Flight>> getAllFlights() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id) {
        return ResponseEntity.ok(flightService.getFlightById(id));
    }

    @PostMapping("/search")
    public ResponseEntity<List<Flight>> searchFlights(@Valid @RequestBody FlightSearchRequest searchRequest) {
        return ResponseEntity.ok(flightService.searchFlights(searchRequest));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Flight> createFlight(@Valid @RequestBody Flight flight) {
        return ResponseEntity.ok(flightService.createFlight(flight));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @Valid @RequestBody Flight flight) {
        return ResponseEntity.ok(flightService.updateFlight(id, flight));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/seats")
    public ResponseEntity<?> getFlightSeats(@PathVariable Long id) {
        return ResponseEntity.ok(flightService.getFlightSeats(id));
    }
}