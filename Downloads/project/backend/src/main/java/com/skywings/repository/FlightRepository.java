package com.skywings.repository;

import com.skywings.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    Optional<Flight> findByFlightNumber(String flightNumber);
    
    @Query("SELECT f FROM Flight f WHERE " +
           "(:origin IS NULL OR LOWER(f.origin) LIKE LOWER(CONCAT('%', :origin, '%'))) AND " +
           "(:destination IS NULL OR LOWER(f.destination) LIKE LOWER(CONCAT('%', :destination, '%'))) AND " +
           "(:departureDate IS NULL OR DATE(f.departureTime) = DATE(:departureDate)) AND " +
           "f.status = 'SCHEDULED'")
    List<Flight> searchFlights(@Param("origin") String origin,
                              @Param("destination") String destination,
                              @Param("departureDate") LocalDateTime departureDate);
    
    List<Flight> findByStatusOrderByDepartureTime(Flight.FlightStatus status);
    
    @Query("SELECT f FROM Flight f WHERE f.departureTime BETWEEN :startDate AND :endDate")
    List<Flight> findFlightsByDateRange(@Param("startDate") LocalDateTime startDate,
                                       @Param("endDate") LocalDateTime endDate);
}