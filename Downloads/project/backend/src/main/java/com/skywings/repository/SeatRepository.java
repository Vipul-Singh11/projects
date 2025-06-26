package com.skywings.repository;

import com.skywings.model.Seat;
import com.skywings.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByFlightOrderBySeatRowAscSeatColumnAsc(Flight flight);
    
    @Query("SELECT s FROM Seat s WHERE s.flight = :flight AND s.status = 'AVAILABLE'")
    List<Seat> findAvailableSeatsByFlight(@Param("flight") Flight flight);
    
    Optional<Seat> findByFlightAndSeatRowAndSeatColumn(Flight flight, Integer seatRow, String seatColumn);
    
    @Query("SELECT COUNT(s) FROM Seat s WHERE s.flight = :flight AND s.status = 'AVAILABLE'")
    Integer countAvailableSeatsByFlight(@Param("flight") Flight flight);
}