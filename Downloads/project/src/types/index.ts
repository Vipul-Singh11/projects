export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalFlights: number;
  memberSince: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  aircraft: string;
  status: 'scheduled' | 'delayed' | 'cancelled' | 'boarding' | 'departed';
}

export interface Seat {
  id: string;
  row: number;
  column: string;
  type: 'economy' | 'business' | 'first';
  price: number;
  status: 'available' | 'occupied' | 'blocked' | 'selected';
  features?: string[];
}

export interface Booking {
  id: string;
  userId: string;
  flightId: string;
  seatId: string;
  passengerName: string;
  bookingDate: string;
  flightDate: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'blocked';
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  baggage: {
    weight: number;
    extraWeight: number;
    charges: number;
  };
  discountApplied: number;
  paymentDueDate?: string;
}

export interface Aircraft {
  id: string;
  model: string;
  totalSeats: number;
  seatConfiguration: {
    economy: { rows: number; seatsPerRow: number };
    business: { rows: number; seatsPerRow: number };
    first: { rows: number; seatsPerRow: number };
  };
}