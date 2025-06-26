-- Insert sample data for testing

-- Insert admin user (password: admin123)
INSERT INTO users (email, password, first_name, last_name, role, loyalty_tier, total_flights) VALUES
('admin@skywings.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Admin', 'User', 'ADMIN', 'PLATINUM', 0);

-- Insert regular user (password: user123)
INSERT INTO users (email, password, first_name, last_name, role, loyalty_tier, total_flights) VALUES
('john.doe@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'John', 'Doe', 'USER', 'GOLD', 24);

-- Insert sample flights
INSERT INTO flights (flight_number, airline, origin, destination, departure_time, arrival_time, duration, price, total_seats, available_seats, aircraft) VALUES
('SW101', 'SkyWings', 'New York (JFK)', 'Los Angeles (LAX)', '2024-02-15 08:00:00', '2024-02-15 11:30:00', '5h 30m', 299.00, 180, 45, 'Boeing 737-800'),
('SW202', 'SkyWings', 'Los Angeles (LAX)', 'Chicago (ORD)', '2024-02-15 14:30:00', '2024-02-15 20:15:00', '3h 45m', 189.00, 150, 23, 'Airbus A320'),
('SW303', 'SkyWings', 'Miami (MIA)', 'Boston (BOS)', '2024-02-16 09:15:00', '2024-02-16 12:45:00', '3h 30m', 249.00, 180, 67, 'Boeing 737-800'),
('SW404', 'SkyWings', 'San Francisco (SFO)', 'Seattle (SEA)', '2024-02-17 16:00:00', '2024-02-17 18:30:00', '2h 30m', 159.00, 150, 89, 'Airbus A320'),
('SW505', 'SkyWings', 'Dallas (DFW)', 'Denver (DEN)', '2024-02-18 11:45:00', '2024-02-18 13:15:00', '2h 30m', 179.00, 180, 112, 'Boeing 737-800');

-- Note: Seats will be automatically generated when flights are created through the application
-- The SeatService.generateSeatsForFlight() method handles seat creation