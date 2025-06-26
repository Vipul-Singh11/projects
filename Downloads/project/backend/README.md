# SkyWings Airlines - Backend API

This is the backend API for the SkyWings Airlines Reservation System built with Java Spring Boot.

## Features

- **User Authentication & Authorization** with JWT tokens
- **Flight Management** - Search, create, update, delete flights
- **Seat Management** - Dynamic seat generation and selection
- **Booking System** - Complete booking flow with seat blocking
- **Baggage Management** - Weight calculation and extra charges
- **Loyalty Program** - Automatic tier upgrades and discounts
- **Admin Panel** - Flight and booking management
- **Payment Processing** - Full and partial payment support

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** with JWT
- **Spring Data JPA**
- **MySQL 8.0**
- **Maven**

## Setup Instructions

### Prerequisites
- Java 17 or higher
- MySQL 8.0
- Maven 3.6+

### Database Setup
1. Create MySQL database:
```sql
CREATE DATABASE airline_reservation;
```

2. Run the schema script:
```bash
mysql -u root -p airline_reservation < database/schema.sql
```

### Application Setup
1. Clone the repository
2. Update database credentials in `application.yml`
3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Flights
- `GET /api/flights` - Get all flights
- `GET /api/flights/{id}` - Get flight by ID
- `POST /api/flights/search` - Search flights
- `POST /api/flights` - Create flight (Admin only)
- `PUT /api/flights/{id}` - Update flight (Admin only)
- `DELETE /api/flights/{id}` - Delete flight (Admin only)
- `GET /api/flights/{id}/seats` - Get flight seats

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/{id}` - Get booking by ID
- `POST /api/bookings/{id}/complete-payment` - Complete payment
- `DELETE /api/bookings/{id}` - Cancel booking
- `GET /api/bookings` - Get all bookings (Admin only)

## Default Users

### Admin User
- Email: `admin@skywings.com`
- Password: `admin123`

### Regular User
- Email: `john.doe@example.com`
- Password: `user123`

## Features Implementation

### Seat Blocking System
- Users can reserve seats by paying 50% upfront
- Remaining payment due 48 hours before departure
- Automatic seat release if payment not completed

### Loyalty Program
- Bronze: 0% discount
- Silver: 5% discount (10+ flights)
- Gold: 10% discount (25+ flights)
- Platinum: 15% discount (50+ flights)

### Baggage System
- Free allowance: 23kg
- Extra weight charge: $15/kg
- Automatic calculation during booking

### Security
- JWT-based authentication
- Role-based access control
- Password encryption with BCrypt
- CORS configuration for frontend integration

## Database Schema

The application uses the following main entities:
- **Users** - Customer and admin accounts
- **Flights** - Flight information and schedules
- **Seats** - Seat configuration and availability
- **Bookings** - Reservation records and payments

## Integration with Frontend

This backend is designed to work seamlessly with the React frontend. The API endpoints match the frontend requirements for:
- User authentication and role management
- Flight search and booking flow
- Seat selection and payment processing
- Admin panel functionality
- Booking history and management

## Development Notes

- All monetary values use `BigDecimal` for precision
- Timestamps use `LocalDateTime` for consistency
- Comprehensive validation with Bean Validation
- Transaction management for data consistency
- Exception handling with custom exceptions
- Automatic seat generation for new flights