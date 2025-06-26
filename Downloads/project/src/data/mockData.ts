import { Flight, User, Booking, Aircraft, Seat } from '../types';

export const mockFlights: Flight[] = [
  {
    id: '1',
    flightNumber: 'SW101',
    airline: 'SkyWings',
    origin: 'New York (JFK)',
    destination: 'Los Angeles (LAX)',
    departureTime: '2024-01-15T08:00:00',
    arrivalTime: '2024-01-15T11:30:00',
    duration: '5h 30m',
    price: 299,
    availableSeats: 45,
    totalSeats: 180,
    aircraft: 'Boeing 737-800',
    status: 'scheduled'
  },
  {
    id: '2',
    flightNumber: 'SW202',
    airline: 'SkyWings',
    origin: 'Los Angeles (LAX)',
    destination: 'Chicago (ORD)',
    departureTime: '2024-01-15T14:30:00',
    arrivalTime: '2024-01-15T20:15:00',
    duration: '3h 45m',
    price: 189,
    availableSeats: 23,
    totalSeats: 150,
    aircraft: 'Airbus A320',
    status: 'scheduled'
  },
  {
    id: '3',
    flightNumber: 'SW303',
    airline: 'SkyWings',
    origin: 'Miami (MIA)',
    destination: 'Boston (BOS)',
    departureTime: '2024-01-16T09:15:00',
    arrivalTime: '2024-01-16T12:45:00',
    duration: '3h 30m',
    price: 249,
    availableSeats: 67,
    totalSeats: 180,
    aircraft: 'Boeing 737-800',
    status: 'scheduled'
  }
];

export const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'user',
  loyaltyTier: 'gold',
  totalFlights: 24,
  memberSince: '2020-03-15'
};

export const mockAdmin: User = {
  id: '2',
  email: 'admin@skywings.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  loyaltyTier: 'platinum',
  totalFlights: 0,
  memberSince: '2019-01-01'
};

export const generateSeats = (flightId: string): Seat[] => {
  const seats: Seat[] = [];
  const seatColumns = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  // First class (rows 1-3)
  for (let row = 1; row <= 3; row++) {
    for (let col = 0; col < 4; col++) {
      seats.push({
        id: `${flightId}-${row}${seatColumns[col]}`,
        row,
        column: seatColumns[col],
        type: 'first',
        price: 150,
        status: Math.random() > 0.3 ? 'available' : 'occupied',
        features: ['Extra legroom', 'Priority boarding', 'Complimentary meal']
      });
    }
  }
  
  // Business class (rows 4-8)
  for (let row = 4; row <= 8; row++) {
    for (let col = 0; col < 4; col++) {
      seats.push({
        id: `${flightId}-${row}${seatColumns[col]}`,
        row,
        column: seatColumns[col],
        type: 'business',
        price: 75,
        status: Math.random() > 0.4 ? 'available' : 'occupied',
        features: ['Extra legroom', 'Priority boarding']
      });
    }
  }
  
  // Economy class (rows 9-30)
  for (let row = 9; row <= 30; row++) {
    for (let col = 0; col < 6; col++) {
      seats.push({
        id: `${flightId}-${row}${seatColumns[col]}`,
        row,
        column: seatColumns[col],
        type: 'economy',
        price: 0,
        status: Math.random() > 0.6 ? 'available' : 'occupied'
      });
    }
  }
  
  return seats;
};

export const loyaltyDiscounts = {
  bronze: 0,
  silver: 5,
  gold: 10,
  platinum: 15
};

export const baggageRates = {
  freeWeight: 23, // kg
  extraWeightRate: 15 // per kg
};