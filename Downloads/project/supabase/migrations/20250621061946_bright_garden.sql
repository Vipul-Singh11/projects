-- Create database
CREATE DATABASE IF NOT EXISTS airline_reservation;
USE airline_reservation;

-- Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(120) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    loyalty_tier ENUM('BRONZE', 'SILVER', 'GOLD', 'PLATINUM') DEFAULT 'BRONZE',
    total_flights INT DEFAULT 0,
    member_since DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Flights table
CREATE TABLE flights (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    flight_number VARCHAR(10) UNIQUE NOT NULL,
    airline VARCHAR(50) NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    duration VARCHAR(20),
    price DECIMAL(10,2) NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT,
    aircraft VARCHAR(50) NOT NULL,
    status ENUM('SCHEDULED', 'DELAYED', 'CANCELLED', 'BOARDING', 'DEPARTED') DEFAULT 'SCHEDULED'
);

-- Seats table
CREATE TABLE seats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    seat_row INT NOT NULL,
    seat_column VARCHAR(2) NOT NULL,
    type ENUM('ECONOMY', 'BUSINESS', 'FIRST') NOT NULL,
    upgrade_price DECIMAL(10,2) DEFAULT 0,
    status ENUM('AVAILABLE', 'OCCUPIED', 'BLOCKED', 'SELECTED') DEFAULT 'AVAILABLE',
    flight_id BIGINT NOT NULL,
    FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE,
    UNIQUE KEY unique_seat_per_flight (flight_id, seat_row, seat_column)
);

-- Seat features table
CREATE TABLE seat_features (
    seat_id BIGINT NOT NULL,
    feature VARCHAR(100) NOT NULL,
    FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE
);

-- Bookings table
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    passenger_name VARCHAR(100) NOT NULL,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('CONFIRMED', 'PENDING', 'CANCELLED', 'BLOCKED') DEFAULT 'CONFIRMED',
    total_amount DECIMAL(10,2) NOT NULL,
    paid_amount DECIMAL(10,2) NOT NULL,
    remaining_amount DECIMAL(10,2) DEFAULT 0,
    baggage_weight INT DEFAULT 0,
    extra_baggage_weight INT DEFAULT 0,
    baggage_charges DECIMAL(10,2) DEFAULT 0,
    discount_applied INT DEFAULT 0,
    payment_due_date DATETIME,
    is_blocking BOOLEAN DEFAULT FALSE,
    user_id BIGINT NOT NULL,
    flight_id BIGINT NOT NULL,
    seat_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (flight_id) REFERENCES flights(id),
    FOREIGN KEY (seat_id) REFERENCES seats(id)
);

-- Insert sample data
INSERT INTO users (email, password, first_name, last_name, role, loyalty_tier, total_flights) VALUES
('admin@skywings.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Admin', 'User', 'ADMIN', 'PLATINUM', 0),
('john.doe@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'John', 'Doe', 'USER', 'GOLD', 24);

INSERT INTO flights (flight_number, airline, origin, destination, departure_time, arrival_time, duration, price, total_seats, available_seats, aircraft) VALUES
('SW101', 'SkyWings', 'New York (JFK)', 'Los Angeles (LAX)', '2024-01-15 08:00:00', '2024-01-15 11:30:00', '5h 30m', 299.00, 180, 45, 'Boeing 737-800'),
('SW202', 'SkyWings', 'Los Angeles (LAX)', 'Chicago (ORD)', '2024-01-15 14:30:00', '2024-01-15 20:15:00', '3h 45m', 189.00, 150, 23, 'Airbus A320'),
('SW303', 'SkyWings', 'Miami (MIA)', 'Boston (BOS)', '2024-01-16 09:15:00', '2024-01-16 12:45:00', '3h 30m', 249.00, 180, 67, 'Boeing 737-800');