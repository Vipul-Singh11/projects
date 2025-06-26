import React from 'react';
import { Luggage, ArrowLeft } from 'lucide-react';
import { baggageRates } from '../../data/mockData';

interface BaggageSelectionProps {
  weight: number;
  onWeightChange: (weight: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const BaggageSelection: React.FC<BaggageSelectionProps> = ({
  weight,
  onWeightChange,
  onNext,
  onBack
}) => {
  const extraWeight = Math.max(0, weight - baggageRates.freeWeight);
  const charges = extraWeight * baggageRates.extraWeightRate;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Baggage Information</h2>
        <p className="text-gray-600">Select your baggage weight and pay for excess if needed</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Luggage className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Baggage Allowance</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Free allowance:</span>
                <span className="font-semibold">{baggageRates.freeWeight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Excess rate:</span>
                <span className="font-semibold">${baggageRates.extraWeightRate}/kg</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Baggage Weight (kg)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={weight}
                  onChange={(e) => onWeightChange(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="bg-gray-100 px-3 py-2 rounded-lg min-w-16 text-center">
                  <span className="font-semibold">{weight} kg</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Free allowance:</span>
                <span>{Math.min(weight, baggageRates.freeWeight)} kg</span>
              </div>
              {extraWeight > 0 && (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Extra weight:</span>
                    <span className="text-orange-600 font-medium">{extraWeight} kg</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Extra charges:</span>
                    <span className="text-red-600 font-semibold">${charges}</span>
                  </div>
                </>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total baggage cost:</span>
                  <span className="font-bold text-lg">
                    {charges > 0 ? `$${charges}` : 'Free'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Baggage Guidelines</h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Size Restrictions</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Maximum dimensions: 158cm (62 inches)</li>
                <li>• Length + Width + Height combined</li>
                <li>• Hard and soft cases accepted</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Prohibited Items</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Flammable liquids and gases</li>
                <li>• Sharp objects</li>
                <li>• Batteries (certain types)</li>
                <li>• Firearms and ammunition</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Special Items</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Sports equipment: Additional fees apply</li>
                <li>• Musical instruments: Contact us</li>
                <li>• Fragile items: Special handling available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Seats</span>
        </button>
        
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default BaggageSelection;