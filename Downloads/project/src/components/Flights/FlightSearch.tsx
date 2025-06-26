import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Users, Filter, Clock, Plane } from 'lucide-react';
import { Flight } from '../../types';
import { mockFlights } from '../../data/mockData';
import { format } from 'date-fns';

interface FlightSearchProps {
  onNavigate: (page: string, data?: any) => void;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ onNavigate }) => {
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    tripType: 'round-trip'
  });
  
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'time' | 'duration'>('price');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    // Simulate search results
    setFlights(mockFlights);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter flights based on search criteria
    const filteredFlights = mockFlights.filter(flight => {
      const matchesOrigin = !searchForm.from || flight.origin.toLowerCase().includes(searchForm.from.toLowerCase());
      const matchesDestination = !searchForm.to || flight.destination.toLowerCase().includes(searchForm.to.toLowerCase());
      return matchesOrigin && matchesDestination;
    });
    
    setFlights(filteredFlights);
    setLoading(false);
  };

  const sortedFlights = [...flights].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'time':
        return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
      case 'duration':
        return a.duration.localeCompare(b.duration);
      default:
        return 0;
    }
  });

  const filteredFlights = sortedFlights.filter(flight => 
    flight.price >= priceRange[0] && flight.price <= priceRange[1]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-green-600 bg-green-100';
      case 'delayed': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'boarding': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex space-x-6 mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="tripType"
                  value="round-trip"
                  checked={searchForm.tripType === 'round-trip'}
                  onChange={(e) => setSearchForm({...searchForm, tripType: e.target.value})}
                  className="text-blue-600"
                />
                <span>Round Trip</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="tripType"
                  value="one-way"
                  checked={searchForm.tripType === 'one-way'}
                  onChange={(e) => setSearchForm({...searchForm, tripType: e.target.value})}
                  className="text-blue-600"
                />
                <span>One Way</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Origin"
                    value={searchForm.from}
                    onChange={(e) => setSearchForm({...searchForm, from: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Destination"
                    value={searchForm.to}
                    onChange={(e) => setSearchForm({...searchForm, to: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="date"
                    value={searchForm.departure}
                    onChange={(e) => setSearchForm({...searchForm, departure: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {searchForm.tripType === 'round-trip' && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="date"
                      value={searchForm.return}
                      onChange={(e) => setSearchForm({...searchForm, return: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={searchForm.passengers}
                    onChange={(e) => setSearchForm({...searchForm, passengers: parseInt(e.target.value)})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search Flights'}
                <Search className="inline-block ml-2 h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="price">Price</option>
              <option value="time">Departure Time</option>
              <option value="duration">Duration</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Price Range:</span>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-32"
            />
            <span className="text-sm text-gray-600">${priceRange[0]} - ${priceRange[1]}</span>
          </div>
        </div>

        {/* Flight Results */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Searching for flights...</p>
            </div>
          ) : filteredFlights.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No flights found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            filteredFlights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Plane className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{flight.flightNumber}</h3>
                          <p className="text-sm text-gray-600">{flight.aircraft}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(flight.status)}`}>
                        {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Departure</p>
                        <p className="font-semibold">{flight.origin}</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(flight.departureTime), 'MMM dd, yyyy')}
                        </p>
                        <p className="font-medium">
                          {format(new Date(flight.departureTime), 'HH:mm')}
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <div className="h-px bg-gray-300 flex-1"></div>
                          <Clock className="h-4 w-4 text-gray-400" />
                          <div className="h-px bg-gray-300 flex-1"></div>
                        </div>
                        <p className="text-sm text-gray-600">{flight.duration}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">Arrival</p>
                        <p className="font-semibold">{flight.destination}</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(flight.arrivalTime), 'MMM dd, yyyy')}
                        </p>
                        <p className="font-medium">
                          {format(new Date(flight.arrivalTime), 'HH:mm')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{flight.availableSeats}</span> seats available
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
                        <p className="text-sm text-gray-600">per person</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-0 lg:ml-6">
                    <button
                      onClick={() => onNavigate('booking', { flight })}
                      className="w-full lg:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Select Flight
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;