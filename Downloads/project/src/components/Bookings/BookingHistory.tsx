import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, User, CreditCard, X, Download } from 'lucide-react';
import { Booking } from '../../types';
import { format } from 'date-fns';

interface BookingHistoryProps {
  onNavigate: (page: string) => void;
}

const BookingHistory: React.FC<BookingHistoryProps> = ({ onNavigate }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    // Mock booking data
    const mockBookings: Booking[] = [
      {
        id: '1',
        userId: '1',
        flightId: '1',
        seatId: '1-12A',
        passengerName: 'John Doe',
        bookingDate: '2024-01-10T10:00:00',
        flightDate: '2024-01-20T08:00:00',
        status: 'confirmed',
        totalAmount: 299,
        paidAmount: 299,
        remainingAmount: 0,
        baggage: {
          weight: 25,
          extraWeight: 2,
          charges: 30
        },
        discountApplied: 10
      },
      {
        id: '2',
        userId: '1',
        flightId: '2',
        seatId: '2-8C',
        passengerName: 'John Doe',
        bookingDate: '2024-01-05T15:30:00',
        flightDate: '2024-01-25T14:30:00',
        status: 'blocked',
        totalAmount: 189,
        paidAmount: 94.5,
        remainingAmount: 94.5,
        baggage: {
          weight: 23,
          extraWeight: 0,
          charges: 0
        },
        discountApplied: 10,
        paymentDueDate: '2024-01-23T14:30:00'
      },
      {
        id: '3',
        userId: '1',
        flightId: '3',
        seatId: '3-15B',
        passengerName: 'John Doe',
        bookingDate: '2023-12-20T09:15:00',
        flightDate: '2023-12-28T09:15:00',
        status: 'confirmed',
        totalAmount: 249,
        paidAmount: 249,
        remainingAmount: 0,
        baggage: {
          weight: 20,
          extraWeight: 0,
          charges: 0
        },
        discountApplied: 10
      }
    ];
    
    setBookings(mockBookings);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'blocked': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return new Date(booking.flightDate) > new Date();
    if (filter === 'past') return new Date(booking.flightDate) < new Date();
    if (filter === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ));
    setSelectedBooking(null);
  };

  const handleCompletePayment = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { 
            ...booking, 
            status: 'confirmed' as const,
            paidAmount: booking.totalAmount,
            remainingAmount: 0
          }
        : booking
    ));
    setSelectedBooking(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-gray-600">Manage your flight reservations and view booking history</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { key: 'all', label: 'All Bookings' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'past', label: 'Past Flights' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  filter === tab.key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-4">Start your journey by booking a flight</p>
              <button
                onClick={() => onNavigate('search')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search Flights
              </button>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Booking #{booking.id}</h3>
                            <p className="text-sm text-gray-600">
                              Booked on {format(new Date(booking.bookingDate), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Flight Date</p>
                          <p className="font-medium">
                            {format(new Date(booking.flightDate), 'MMM dd, yyyy')}
                          </p>
                          <p className="text-sm text-gray-600">
                            {format(new Date(booking.flightDate), 'HH:mm')}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">Passenger</p>
                          <p className="font-medium">{booking.passengerName}</p>
                          <p className="text-sm text-gray-600">Seat: {booking.seatId}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">Amount</p>
                          <p className="font-medium">${booking.totalAmount}</p>
                          {booking.remainingAmount > 0 && (
                            <p className="text-sm text-orange-600">
                              Remaining: ${booking.remainingAmount}
                            </p>
                          )}
                        </div>
                      </div>

                      {booking.status === 'blocked' && booking.paymentDueDate && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                          <p className="text-sm text-yellow-800">
                            <strong>Payment Due:</strong> Complete payment by{' '}
                            {format(new Date(booking.paymentDueDate), 'MMM dd, yyyy HH:mm')}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        View Details
                      </button>
                      
                      {booking.status === 'blocked' && (
                        <button
                          onClick={() => handleCompletePayment(booking.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          Complete Payment
                        </button>
                      )}
                      
                      {booking.status !== 'cancelled' && new Date(booking.flightDate) > new Date() && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Booking Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Booking ID:</span>
                          <span className="font-mono">{selectedBooking.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedBooking.status)}`}>
                            {selectedBooking.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Passenger:</span>
                          <span>{selectedBooking.passengerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Seat:</span>
                          <span>{selectedBooking.seatId}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Amount:</span>
                          <span>${selectedBooking.totalAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Paid Amount:</span>
                          <span className="text-green-600">${selectedBooking.paidAmount}</span>
                        </div>
                        {selectedBooking.remainingAmount > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Remaining:</span>
                            <span className="text-orange-600">${selectedBooking.remainingAmount}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discount Applied:</span>
                          <span>{selectedBooking.discountApplied}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Baggage Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Total Weight:</span>
                          <p className="font-medium">{selectedBooking.baggage.weight} kg</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Extra Weight:</span>
                          <p className="font-medium">{selectedBooking.baggage.extraWeight} kg</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Extra Charges:</span>
                          <p className="font-medium">${selectedBooking.baggage.charges}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download E-Ticket</span>
                    </button>
                    
                    {selectedBooking.status === 'blocked' && (
                      <button
                        onClick={() => handleCompletePayment(selectedBooking.id)}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CreditCard className="h-4 w-4" />
                        <span>Complete Payment</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;