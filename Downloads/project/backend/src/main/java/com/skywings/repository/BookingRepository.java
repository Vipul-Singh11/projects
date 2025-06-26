package com.skywings.repository;

import com.skywings.model.Booking;
import com.skywings.model.User;
import com.skywings.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserOrderByBookingDateDesc(User user);
    
    List<Booking> findByFlightOrderByBookingDateDesc(Flight flight);
    
    @Query("SELECT b FROM Booking b WHERE b.status = :status")
    List<Booking> findByStatus(@Param("status") Booking.BookingStatus status);
    
    @Query("SELECT b FROM Booking b WHERE b.isBlocking = true AND b.paymentDueDate < :currentDate")
    List<Booking> findExpiredBlockedBookings(@Param("currentDate") LocalDateTime currentDate);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.user = :user AND b.status = 'CONFIRMED'")
    Integer countConfirmedBookingsByUser(@Param("user") User user);
    
    @Query("SELECT b FROM Booking b WHERE b.bookingDate BETWEEN :startDate AND :endDate")
    List<Booking> findBookingsByDateRange(@Param("startDate") LocalDateTime startDate,
                                         @Param("endDate") LocalDateTime endDate);
}