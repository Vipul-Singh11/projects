import React, { useState, useEffect } from 'react';
import { Flight, Seat } from '../../types';
import { generateSeats } from '../../data/mockData';

interface SeatSelectionProps {
  flight: Flight;
  selectedSeat: Seat | null;
  onSeatSelect: (seat: Seat) => void;
  onNext: () => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ 
  flight, 
  selectedSeat, 
  onSeatSelect, 
  onNext 
}) => {
  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    setSeats(generateSeats(flight.id));
  }, [flight.id]);

  const getSeatColor = (seat: Seat) => {
    if (selectedSeat?.id === seat.id) return 'bg-blue-600 text-white border-blue-600';
    
    switch (seat.status) {
      case 'available':
        return seat.type === 'first' 
          ? 'bg-purple-100 hover:bg-purple-200 border-purple-300 text-purple-800'
          : seat.type === 'business'
          ? 'bg-blue-100 hover:bg-blue-200 border-blue-300 text-blue-800'
          : 'bg-green-100 hover:bg-green-200 border-green-300 text-green-800';
      case 'occupied':
        return 'bg-gray-400 text-white cursor-not-allowed';
      case 'blocked':
        return 'bg-yellow-400 text-white cursor-not-allowed';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const groupSeatsByRow = () => {
    const grouped: { [key: number]: Seat[] } = {};
    seats.forEach(seat => {
      if (!grouped[seat.row]) {
        grouped[seat.row] = [];
      }
      grouped[seat.row].push(seat);
    });
    return grouped;
  };

  const seatsByRow = groupSeatsByRow();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Seat</h2>
        <p className="text-gray-600">Choose your preferred seat for the journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Seat Map */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="bg-blue-600 text-white py-2 px-4 rounded-t-lg inline-block">
                <span className="font-semibold">Front of Aircraft</span>
              </div>
            </div>

            <div className="space-y-2">
              {Object.entries(seatsByRow).map(([row, rowSeats]) => (
                <div key={row} className="flex items-center justify-center space-x-2">
                  <span className="w-8 text-center text-sm font-medium text-gray-600">
                    {row}
                  </span>
                  
                  <div className="flex space-x-1">
                    {rowSeats.slice(0, Math.ceil(rowSeats.length / 2)).map(seat => (
                      <button
                        key={seat.id}
                        onClick={() => seat.status === 'available' && onSeatSelect(seat)}
                        disabled={seat.status !== 'available'}
                        className={`w-8 h-8 rounded border-2 text-xs font-medium transition-colors ${getSeatColor(seat)}`}
                        title={`${seat.row}${seat.column} - ${seat.type} class ${seat.price > 0 ? `(+$${seat.price})` : ''}`}
                      >
                        {seat.column}
                      </button>
                    ))}
                  </div>

                  {/* Aisle */}
                  <div className="w-4"></div>

                  <div className="flex space-x-1">
                    {rowSeats.slice(Math.ceil(rowSeats.length / 2)).map(seat => (
                      <button
                        key={seat.id}
                        onClick={() => seat.status === 'available' && onSeatSelect(seat)}
                        disabled={seat.status !== 'available'}
                        className={`w-8 h-8 rounded border-2 text-xs font-medium transition-colors ${getSeatColor(seat)}`}
                        title={`${seat.row}${seat.column} - ${seat.type} class ${seat.price > 0 ? `(+$${seat.price})` : ''}`}
                      >
                        {seat.column}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
              <span>Economy Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
              <span>Business Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-100 border-2 border-purple-300 rounded"></div>
              <span>First Class Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span>Selected</span>
            </div>
          </div>
        </div>

        {/* Seat Details */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Seat Details</h3>
          
          {selectedSeat ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Selected Seat</p>
                <p className="text-2xl font-bold text-blue-600">
                  {selectedSeat.row}{selectedSeat.column}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Class</p>
                <p className="font-semibold capitalize">{selectedSeat.type}</p>
              </div>

              {selectedSeat.price > 0 && (
                <div>
                  <p className="text-sm text-gray-600">Upgrade Fee</p>
                  <p className="font-semibold text-green-600">+${selectedSeat.price}</p>
                </div>
              )}

              {selectedSeat.features && selectedSeat.features.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Features</p>
                  <ul className="text-sm space-y-1">
                    {selectedSeat.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={onNext}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continue to Baggage
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>Select a seat to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;