package com.skywings.service;

import com.skywings.model.Flight;
import com.skywings.model.Seat;
import com.skywings.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class SeatService {
    
    @Autowired
    private SeatRepository seatRepository;

    public void generateSeatsForFlight(Flight flight) {
        List<Seat> seats = new ArrayList<>();
        String[] columns = {"A", "B", "C", "D", "E", "F"};
        
        // First class (rows 1-3)
        for (int row = 1; row <= 3; row++) {
            for (int col = 0; col < 4; col++) {
                Seat seat = new Seat();
                seat.setSeatRow(row);
                seat.setSeatColumn(columns[col]);
                seat.setType(Seat.SeatType.FIRST);
                seat.setUpgradePrice(BigDecimal.valueOf(150));
                seat.setFlight(flight);
                seat.setFeatures(Arrays.asList("Extra legroom", "Priority boarding", "Complimentary meal"));
                seats.add(seat);
            }
        }
        
        // Business class (rows 4-8)
        for (int row = 4; row <= 8; row++) {
            for (int col = 0; col < 4; col++) {
                Seat seat = new Seat();
                seat.setSeatRow(row);
                seat.setSeatColumn(columns[col]);
                seat.setType(Seat.SeatType.BUSINESS);
                seat.setUpgradePrice(BigDecimal.valueOf(75));
                seat.setFlight(flight);
                seat.setFeatures(Arrays.asList("Extra legroom", "Priority boarding"));
                seats.add(seat);
            }
        }
        
        // Economy class (rows 9-30)
        for (int row = 9; row <= 30; row++) {
            for (int col = 0; col < 6; col++) {
                Seat seat = new Seat();
                seat.setSeatRow(row);
                seat.setSeatColumn(columns[col]);
                seat.setType(Seat.SeatType.ECONOMY);
                seat.setUpgradePrice(BigDecimal.ZERO);
                seat.setFlight(flight);
                seats.add(seat);
            }
        }
        
        seatRepository.saveAll(seats);
    }

    public List<Seat> getAvailableSeats(Long flightId) {
        Flight flight = new Flight();
        flight.setId(flightId);
        return seatRepository.findAvailableSeatsByFlight(flight);
    }
}