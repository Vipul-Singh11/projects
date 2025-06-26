import React from 'react';
import { CheckCircle, Download, Calendar, MapPin, User, Luggage, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

interface BookingConfirmationProps {
  booking: any;
  onComplete: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking, onComplete }) => {
  const { flight, seat, pricing, paidAmount, totalAmount, isBlocking } = booking;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isBlocking ? 'Seat Reserved!' : 'Booking Confirmed!'}
        </h2>
        <p className="text-gray-600">
          {isBlocking 
            ? 'Your seat has been reserved. Complete payment 48 hours before departure.'
            : 'Your flight has been successfully booked. Have a great journey!'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Details */}
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Flight Details</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{flight.flightNumber}</p>
                  <p className="text-sm text-gray-600">{flight.aircraft}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">{flight.origin} → {flight.destination}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(flight.departureTime), 'MMM dd, yyyy • HH:mm')}
                  </p>
                </div>
              </div>

              {seat && (
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Seat {seat.row}{seat.column}</p>
                    <p className="text-sm text-gray-600 capitalize">{seat.type} class</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-mono">{booking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">${totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold text-green-600">${paidAmount}</span>
              </div>
              {isBlocking && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-semibold text-orange-600">${totalAmount - paidAmount}</span>
                </div>
              )}
            </div>
          </div>

          {isBlocking && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <CreditCard className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-yellow-800">Payment Reminder</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Complete your payment of ${(totalAmount - paidAmount).toFixed(2)} by{' '}
                    {format(new Date(Date.now() + 24 * 60 * 60 * 1000), 'MMM dd, yyyy')} to secure your booking.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-5 w-5" />
                <span>Download E-Ticket</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="h-5 w-5" />
                <span>Add to Calendar</span>
              </button>
              
              <button
                onClick={onComplete}
                className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>View All Bookings</span>
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Information</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                <p>Check-in opens 24 hours before departure</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                <p>Arrive at airport 2 hours before domestic flights</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                <p>Bring valid ID and e-ticket confirmation</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                <p>Free cancellation up to 24 hours before departure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;