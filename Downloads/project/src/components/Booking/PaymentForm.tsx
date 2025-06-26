import React, { useState } from 'react';
import { CreditCard, ArrowLeft, Shield, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface PaymentFormProps {
  pricing: {
    basePrice: number;
    seatUpgrade: number;
    baggageCharges: number;
    discount: number;
    total: number;
  };
  isBlocking: boolean;
  onBlockingChange: (blocking: boolean) => void;
  onPayment: (paymentData: any) => void;
  onBack: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  pricing,
  isBlocking,
  onBlockingChange,
  onPayment,
  onBack
}) => {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  });

  const paymentAmount = isBlocking ? pricing.total * 0.5 : pricing.total;
  const remainingAmount = isBlocking ? pricing.total * 0.5 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const paymentData = {
      method: paymentMethod,
      amount: paymentAmount,
      remainingAmount,
      cardData: paymentMethod === 'card' ? cardData : null,
      timestamp: new Date().toISOString()
    };

    onPayment(paymentData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Information</h2>
        <p className="text-gray-600">Complete your booking securely</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Seat Blocking Option */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="blocking"
                checked={isBlocking}
                onChange={(e) => onBlockingChange(e.target.checked)}
                className="mt-1 h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <div className="flex-1">
                <label htmlFor="blocking" className="text-sm font-medium text-yellow-800">
                  Block seat with 50% payment
                </label>
                <p className="text-xs text-yellow-700 mt-1">
                  Pay only 50% now and complete payment 48 hours before departure. 
                  Remaining amount: ${remainingAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-bold text-blue-600">PayPal</span>
                </button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <>
                {/* Card Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={(e) => setCardData({...cardData, number: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardData.name}
                      onChange={(e) => setCardData({...cardData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Billing Address */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={cardData.billingAddress.street}
                        onChange={(e) => setCardData({
                          ...cardData,
                          billingAddress: {...cardData.billingAddress, street: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={cardData.billingAddress.city}
                        onChange={(e) => setCardData({
                          ...cardData,
                          billingAddress: {...cardData.billingAddress, city: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={cardData.billingAddress.state}
                        onChange={(e) => setCardData({
                          ...cardData,
                          billingAddress: {...cardData.billingAddress, state: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={cardData.billingAddress.zip}
                        onChange={(e) => setCardData({
                          ...cardData,
                          billingAddress: {...cardData.billingAddress, zip: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        value={cardData.billingAddress.country}
                        onChange={(e) => setCardData({
                          ...cardData,
                          billingAddress: {...cardData.billingAddress, country: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <Lock className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Your payment information is secure and encrypted
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Baggage</span>
              </button>
              
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {paymentMethod === 'paypal' ? 'Pay with PayPal' : `Pay $${paymentAmount.toFixed(2)}`}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base ticket price:</span>
              <span>${pricing.basePrice}</span>
            </div>
            
            {pricing.seatUpgrade > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Seat upgrade:</span>
                <span>${pricing.seatUpgrade}</span>
              </div>
            )}
            
            {pricing.baggageCharges > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Baggage charges:</span>
                <span>${pricing.baggageCharges}</span>
              </div>
            )}
            
            {pricing.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Loyalty discount ({pricing.discount}%):</span>
                <span>-${((pricing.basePrice + pricing.seatUpgrade + pricing.baggageCharges) * pricing.discount / 100).toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${pricing.total}</span>
              </div>
            </div>
            
            {isBlocking && (
              <>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-blue-600 font-medium">
                    <span>Paying now (50%):</span>
                    <span>${paymentAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-orange-600 font-medium">
                    <span>Remaining amount:</span>
                    <span>${remainingAmount.toFixed(2)}</span>
                  </div>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    You must complete payment 48 hours before departure
                  </p>
                </div>
              </>
            )}
          </div>

          {user && (
            <div className="mt-6 p-4 bg-white rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">Loyalty Status</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current tier:</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                  {user.loyaltyTier.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Earning points for this flight: {Math.round(pricing.total * 10)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;