import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Clock, MapPin } from 'lucide-react';
import { Flight } from '../../types';
import { mockFlights } from '../../data/mockData';
import { format } from 'date-fns';

const FlightManagement: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] =  useState<Flight[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);

  const [newFlight, setNewFlight] = useState({
    flightNumber: '',
    airline: 'SkyWings',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    price: 0,
    totalSeats: 180,
    aircraft: 'Boeing 737-800',
    status: 'scheduled' as const
  });

  useEffect(() => {
    setFlights(mockFlights);
    setFilteredFlights(mockFlights);
  }, []);

  useEffect(() => {
    let filtered = flights;

    if (searchTerm) {
      filtered = filtered.filter(flight =>
        flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(flight => flight.status === statusFilter);
    }

    setFilteredFlights(filtered);
  }, [flights, searchTerm, statusFilter]);

  const handleAddFlight = (e: React.FormEvent) => {
    e.preventDefault();
    
    const flight: Flight = {
      id: Date.now().toString(),
      ...newFlight,
      duration: calculateDuration(newFlight.departureTime, newFlight.arrivalTime),
      availableSeats: newFlight.totalSeats
    };

    setFlights(prev => [...prev, flight]);
    setShowAddModal(false);
    setNewFlight({
      flightNumber: '',
      airline: 'SkyWings',
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      price: 0,
      totalSeats: 180,
      aircraft: 'Boeing 737-800',
      status: 'scheduled'
    });
  };

  const handleEditFlight = (flight: Flight) => {
    setEditingFlight(flight);
    setNewFlight({
      flightNumber: flight.flightNumber,
      airline: flight.airline,
      origin: flight.origin,
      destination: flight.destination,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      price: flight.price,
      totalSeats: flight.totalSeats,
      aircraft: flight.aircraft,
      status: flight.status
    });
    setShowAddModal(true);
  };

  const handleUpdateFlight = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingFlight) return;

    const updatedFlight: Flight = {
      ...editingFlight,
      ...newFlight,
      duration: calculateDuration(newFlight.departureTime, newFlight.arrivalTime)
    };

    setFlights(prev => prev.map(flight => 
      flight.id === editingFlight.id ? updatedFlight : flight
    ));
    
    setShowAddModal(false);
    setEditingFlight(null);
    setNewFlight({
      flightNumber: '',
      airline: 'SkyWings',
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      price: 0,
      totalSeats: 180,
      aircraft: 'Boeing 737-800',
      status: 'scheduled'
    });
  };

  const handleDeleteFlight = (flightId: string) => {
    if (confirm('Are you sure you want to delete this flight?')) {
      setFlights(prev => prev.filter(flight => flight.id !== flightId));
    }
  };

  const calculateDuration = (departure: string, arrival: string) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diff = arr.getTime() - dep.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-green-600 bg-green-100';
      case 'delayed': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'boarding': return 'text-blue-600 bg-blue-100';
      case 'departed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Flight Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Flight</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search flights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="delayed">Delayed</option>
              <option value="cancelled">Cancelled</option>
              <option value="boarding">Boarding</option>
              <option value="departed">Departed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Flights Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aircraft
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFlights.map((flight) => (
                <tr key={flight.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{flight.flightNumber}</div>
                      <div className="text-sm text-gray-500">{flight.airline}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-900">{flight.origin}</span>
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{flight.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">
                        {format(new Date(flight.departureTime), 'MMM dd, HH:mm')}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {flight.duration}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {flight.aircraft}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${flight.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {flight.availableSeats}/{flight.totalSeats}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${((flight.totalSeats - flight.availableSeats) / flight.totalSeats) * 100}%`
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(flight.status)}`}>
                      {flight.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditFlight(flight)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFlight(flight.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Flight Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingFlight ? 'Edit Flight' : 'Add New Flight'}
              </h2>

              <form onSubmit={editingFlight ? handleUpdateFlight : handleAddFlight} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Flight Number
                    </label>
                    <input
                      type="text"
                      required
                      value={newFlight.flightNumber}
                      onChange={(e) => setNewFlight({...newFlight, flightNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="SW101"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aircraft
                    </label>
                    <select
                      value={newFlight.aircraft}
                      onChange={(e) => setNewFlight({...newFlight, aircraft: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Boeing 737-800">Boeing 737-800</option>
                      <option value="Airbus A320">Airbus A320</option>
                      <option value="Boeing 777-300">Boeing 777-300</option>
                      <option value="Airbus A350">Airbus A350</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Origin
                    </label>
                    <input
                      type="text"
                      required
                      value={newFlight.origin}
                      onChange={(e) => setNewFlight({...newFlight, origin: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="New York (JFK)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination
                    </label>
                    <input
                      type="text"
                      required
                      value={newFlight.destination}
                      onChange={(e) => setNewFlight({...newFlight, destination: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Los Angeles (LAX)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departure Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={newFlight.departureTime}
                      onChange={(e) => setNewFlight({...newFlight, departureTime: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arrival Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={newFlight.arrivalTime}
                      onChange={(e) => setNewFlight({...newFlight, arrivalTime: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newFlight.price}
                      onChange={(e) => setNewFlight({...newFlight, price: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Seats
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newFlight.totalSeats}
                      onChange={(e) => setNewFlight({...newFlight, totalSeats: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={newFlight.status}
                      onChange={(e) => setNewFlight({...newFlight, status: e.target.value as any})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="delayed">Delayed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="boarding">Boarding</option>
                      <option value="departed">Departed</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingFlight(null);
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingFlight ? 'Update Flight' : 'Add Flight'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightManagement;