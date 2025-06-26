# SkyWings Airlines - Complete Reservation System

A comprehensive airline reservation system built with React frontend and Java Spring Boot backend.

## 🚀 Features

### User Features
- **Flight Search & Booking** - Search flights by origin, destination, and date
- **Seat Selection** - Interactive seat map with different class options
- **Baggage Management** - Weight calculation and extra charge handling
- **Seat Blocking** - Reserve seats with 50% payment, complete within 48 hours
- **Loyalty Program** - Automatic tier upgrades and discount benefits
- **Booking History** - View and manage all bookings
- **Payment Processing** - Secure payment with multiple options

### Admin Features
- **Flight Management** - Add, edit, delete flights
- **Booking Analytics** - Comprehensive booking and revenue reports
- **User Management** - View customer information and loyalty status
- **Real-time Dashboard** - Monitor system performance and statistics

### Technical Features
- **JWT Authentication** - Secure user authentication
- **Role-based Access** - Separate user and admin interfaces
- **Responsive Design** - Works on all device sizes
- **Real-time Updates** - Live seat availability and booking status
- **Data Validation** - Comprehensive input validation
- **Error Handling** - Graceful error management

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Date-fns** for date handling
- **React Router** for navigation

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** with JWT
- **Spring Data JPA**
- **MySQL 8.0**
- **Maven** for dependency management

## 📦 Project Structure

```
airline-reservation-system/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts
│   │   ├── data/           # Mock data and utilities
│   │   └── types/          # TypeScript type definitions
│   └── public/             # Static assets
├── backend/                 # Spring Boot application
│   ├── src/main/java/com/skywings/
│   │   ├── controller/     # REST controllers
│   │   ├── service/        # Business logic
│   │   ├── repository/     # Data access layer
│   │   ├── model/          # Entity classes
│   │   ├── dto/            # Data transfer objects
│   │   ├── security/       # Security configuration
│   │   └── exception/      # Exception handling
│   └── src/main/resources/ # Configuration files
└── database/               # Database scripts
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** and npm
- **Java 17+**
- **Maven 3.6+**
- **MySQL 8.0+**

### Database Setup
1. Create MySQL database:
```sql
CREATE DATABASE airline_reservation;
```

2. Run the schema script:
```bash
mysql -u root -p airline_reservation < backend/database/schema.sql
```

3. Insert sample data:
```bash
mysql -u root -p airline_reservation < backend/database/data.sql
```

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Update database credentials in `src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/airline_reservation
    username: your_username
    password: your_password
```

3. Build and run the application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔐 Default Login Credentials

### Admin User
- **Email:** admin@skywings.com
- **Password:** admin123

### Regular User
- **Email:** john.doe@example.com
- **Password:** user123

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Flights
- `GET /api/flights` - Get all flights
- `GET /api/flights/{id}` - Get flight by ID
- `POST /api/flights/search` - Search flights
- `POST /api/flights` - Create flight (Admin)
- `PUT /api/flights/{id}` - Update flight (Admin)
- `DELETE /api/flights/{id}` - Delete flight (Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/{id}` - Get booking by ID
- `POST /api/bookings/{id}/complete-payment` - Complete payment
- `DELETE /api/bookings/{id}` - Cancel booking

## 🎯 Key Features Implementation

### Seat Blocking System
- Users can reserve seats by paying 50% upfront
- Remaining payment due 48 hours before departure
- Automatic seat release if payment not completed

### Loyalty Program
- **Bronze:** 0% discount (default)
- **Silver:** 5% discount (10+ flights)
- **Gold:** 10% discount (25+ flights)
- **Platinum:** 15% discount (50+ flights)

### Baggage System
- Free allowance: 23kg
- Extra weight charge: $15/kg
- Automatic calculation during booking

### Security Features
- JWT-based authentication
- Password encryption with BCrypt
- Role-based access control
- CORS configuration for frontend integration

## 🔧 Development

### Building for Production

#### Frontend
```bash
cd frontend
npm run build
```

#### Backend
```bash
cd backend
mvn clean package
```

### Running Tests
```bash
# Backend tests
cd backend
mvn test

# Frontend tests
cd frontend
npm test
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact:
- Email: support@skywings.com
- Documentation: [Project Wiki](link-to-wiki)

---

**SkyWings Airlines** - Your Journey Begins Here ✈️