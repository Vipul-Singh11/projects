import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Star, Globe, Shield, Heart } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    tripType: 'round-trip'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('search');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Journey Begins <span className="text-yellow-400">Here</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Experience world-class service and comfort with SkyWings Airlines
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSearch} className="space-y-6">
              {/* Trip Type */}
              <div className="flex space-x-6 mb-6">
                <label className="flex items-center space-x-2 text-gray-700">
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
                <label className="flex items-center space-x-2 text-gray-700">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* From */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Departure city"
                      value={searchForm.from}
                      onChange={(e) => setSearchForm({...searchForm, from: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                </div>

                {/* To */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Destination city"
                      value={searchForm.to}
                      onChange={(e) => setSearchForm({...searchForm, to: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                </div>

                {/* Departure */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="date"
                      value={searchForm.departure}
                      onChange={(e) => setSearchForm({...searchForm, departure: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                </div>

                {/* Return */}
                {searchForm.tripType === 'round-trip' && (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        value={searchForm.return}
                        onChange={(e) => setSearchForm({...searchForm, return: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                  </div>
                )}

                {/* Passengers */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      value={searchForm.passengers}
                      onChange={(e) => setSearchForm({...searchForm, passengers: parseInt(e.target.value)})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Search className="inline-block mr-2 h-5 w-5" />
                  Search Flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SkyWings?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our premium services and customer-first approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Network</h3>
              <p className="text-gray-600">Over 200 destinations worldwide with convenient connections</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety First</h3>
              <p className="text-gray-600">Industry-leading safety standards and modern aircraft fleet</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Loyalty Rewards</h3>
              <p className="text-gray-600">Earn points and enjoy exclusive benefits with every flight</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Care</h3>
              <p className="text-gray-600">24/7 support and personalized service for all travelers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Take Off?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of satisfied travelers who choose SkyWings for their journey
          </p>
          <div className="space-x-4">
            <button
              onClick={() => onNavigate('login')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Sign Up Now
            </button>
            <button
              onClick={() => onNavigate('search')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              Browse Flights
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;