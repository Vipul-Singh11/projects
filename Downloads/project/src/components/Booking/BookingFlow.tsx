import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Luggage, CreditCard, CheckCircle } from 'lucide-react';
import { Flight, Seat, User } from '../../types';
import { generateSeats, loyaltyDiscounts, baggageRates } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import SeatSelection from './SeatSelection';
import BaggageSelection from './BaggageSelection';
import PaymentForm from './PaymentForm';
import BookingConfirmation from './BookingConfirmation';

interface BookingFlowProps {
  flight: Flight;
  onNavigate: (page: string) => void;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ flight, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [baggageWeight, setBaggageWeight] = useState(23);
  const [isBlocking, setIsBlocking] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const { user } = useAuth();

  const steps = [
    { id: 1, name: 'Seat Selection', icon: Users },
    { id: 2, name: 'Baggage', icon: Luggage },
    { id: 3, name: 'Payment', icon: CreditCard },
    { id: 4, name: 'Confirmation', icon: CheckCircle }
  ];

  const calculateTotal = () => {
    let total = flight.price;
    
    // Add seat upgrade fee
    if (selectedSeat) {
      total += selectedSeat.price;
    }
    
    // Add baggage fees
    const extraWeight = Math.max(0, baggageWeight - baggageRates.freeWeight);
    const baggageCharges = extraWeight * baggageRates.extraWeightRate;
    total += baggageCharges;
    
    // Apply loyalty discount
    if (user) {
      const discount = loyaltyDiscounts[user.loyaltyTier];
      total = total * (1 - discount / 100);
    }
    
    return {
      basePrice: flight.price,
      seatUpgrade: selectedSeat?.price || 0,
      baggageCharges,
      discount: user ? loyaltyDiscounts[user.loyaltyTier] : 0,
      total: Math.round(total * 100) / 100
    };
  };

  const handlePayment = (paymentData: any) => {
    const pricing = calculateTotal();
    const booking = {
      id: Date.now().toString(),
      flightId: flight.id,
      seatId: selectedSeat?.id,
      baggageWeight,
      isBlocking,
      paidAmount: isBlocking ? pricing.total * 0.5 : pricing.total,
      totalAmount: pricing.total,
      paymentData,
      flight,
      seat: selectedSeat,
      pricing
    };
    
    setBookingData(booking);
    setCurrentStep(4);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SeatSelection
            flight={flight}
            selectedSeat={selectedSeat}
            onSeatSelect={setSelectedSeat}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <BaggageSelection
            weight={baggageWeight}
            onWeightChange={setBaggageWeight}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <PaymentForm
            pricing={calculateTotal()}
            isBlocking={isBlocking}
            onBlockingChange={setIsBlocking}
            onPayment={handlePayment}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <BookingConfirmation
            booking={bookingData}
            onComplete={() => onNavigate('bookings')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('search')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Search</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">
            {flight.flightNumber} • {flight.origin} → {flight.destination}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-px mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {renderStep()}
      </div>
    </div>
  );
};

export default BookingFlow;