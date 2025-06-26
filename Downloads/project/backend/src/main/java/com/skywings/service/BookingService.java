package com.skywings.service;

import com.skywings.dto.BookingRequest;
import com.skywings.dto.PaymentRequest;
import com.skywings.model.*;
import com.skywings.repository.*;
import com.skywings.exception.ResourceNotFoundException;
import com.skywings.exception.BookingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FlightRepository flightRepository;
    
    @Autowired
    private SeatRepository seatRepository;
    
    @Autowired
    private FlightService flightService;

    public Booking createBooking(BookingRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Flight flight = flightRepository.findById(request.getFlightId())
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found"));
        
        Seat seat = seatRepository.findById(request.getSeatId())
                .orElseThrow(() -> new ResourceNotFoundException("Seat not found"));
        
        // Check if seat is available
        if (seat.getStatus() != Seat.SeatStatus.AVAILABLE) {
            throw new BookingException("Seat is not available");
        }
        
        // Calculate total amount
        BigDecimal totalAmount = calculateTotalAmount(flight, seat, request, user);
        
        // Create booking
        Booking booking = new Booking();
        booking.setPassengerName(request.getPassengerName());
        booking.setUser(user);
        booking.setFlight(flight);
        booking.setSeat(seat);
        booking.setTotalAmount(totalAmount);
        booking.setBaggageWeight(request.getBaggageWeight());
        booking.setIsBlocking(request.getIsBlocking());
        
        // Calculate baggage charges
        if (request.getBaggageWeight() > 23) {
            booking.setExtraBaggageWeight(request.getBaggageWeight() - 23);
            booking.setBaggageCharges(BigDecimal.valueOf((request.getBaggageWeight() - 23) * 15));
        }
        
        // Apply loyalty discount
        int discount = getLoyaltyDiscount(user.getLoyaltyTier());
        booking.setDiscountApplied(discount);
        
        // Set payment amounts
        if (request.getIsBlocking()) {
            booking.setPaidAmount(totalAmount.multiply(BigDecimal.valueOf(0.5)));
            booking.setRemainingAmount(totalAmount.multiply(BigDecimal.valueOf(0.5)));
            booking.setPaymentDueDate(flight.getDepartureTime().minusHours(48));
            booking.setStatus(Booking.BookingStatus.BLOCKED);
        } else {
            booking.setPaidAmount(totalAmount);
            booking.setRemainingAmount(BigDecimal.ZERO);
            booking.setStatus(Booking.BookingStatus.CONFIRMED);
        }
        
        // Update seat status
        seat.setStatus(Seat.SeatStatus.OCCUPIED);
        seatRepository.save(seat);
        
        // Update flight available seats
        flightService.updateAvailableSeats(flight.getId());
        
        // Update user flight count
        user.setTotalFlights(user.getTotalFlights() + 1);
        updateUserLoyaltyTier(user);
        userRepository.save(user);
        
        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return bookingRepository.findByUserOrderByBookingDateDesc(user);
    }

    public Booking getBookingById(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        
        if (!booking.getUser().getId().equals(userId)) {
            throw new BookingException("Access denied");
        }
        
        return booking;
    }

    public Booking completePayment(Long bookingId, PaymentRequest paymentRequest, Long userId) {
        Booking booking = getBookingById(bookingId, userId);
        
        if (booking.getStatus() != Booking.BookingStatus.BLOCKED) {
            throw new BookingException("Booking is not in blocked status");
        }
        
        booking.setPaidAmount(booking.getTotalAmount());
        booking.setRemainingAmount(BigDecimal.ZERO);
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        
        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long bookingId, Long userId) {
        Booking booking = getBookingById(bookingId, userId);
        
        // Check if cancellation is allowed (24 hours before departure)
        if (booking.getFlight().getDepartureTime().isBefore(LocalDateTime.now().plusHours(24))) {
            throw new BookingException("Cannot cancel booking less than 24 hours before departure");
        }
        
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        
        // Free up the seat
        booking.getSeat().setStatus(Seat.SeatStatus.AVAILABLE);
        seatRepository.save(booking.getSeat());
        
        // Update flight available seats
        flightService.updateAvailableSeats(booking.getFlight().getId());
        
        bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    private BigDecimal calculateTotalAmount(Flight flight, Seat seat, BookingRequest request, User user) {
        BigDecimal amount = flight.getPrice().add(seat.getUpgradePrice());
        
        // Add baggage charges
        if (request.getBaggageWeight() > 23) {
            amount = amount.add(BigDecimal.valueOf((request.getBaggageWeight() - 23) * 15));
        }
        
        // Apply loyalty discount
        int discount = getLoyaltyDiscount(user.getLoyaltyTier());
        if (discount > 0) {
            BigDecimal discountAmount = amount.multiply(BigDecimal.valueOf(discount / 100.0));
            amount = amount.subtract(discountAmount);
        }
        
        return amount;
    }

    private int getLoyaltyDiscount(User.LoyaltyTier tier) {
        switch (tier) {
            case SILVER: return 5;
            case GOLD: return 10;
            case PLATINUM: return 15;
            default: return 0;
        }
    }

    private void updateUserLoyaltyTier(User user) {
        int totalFlights = user.getTotalFlights();
        if (totalFlights >= 50) {
            user.setLoyaltyTier(User.LoyaltyTier.PLATINUM);
        } else if (totalFlights >= 25) {
            user.setLoyaltyTier(User.LoyaltyTier.GOLD);
        } else if (totalFlights >= 10) {
            user.setLoyaltyTier(User.LoyaltyTier.SILVER);
        }
    }
}