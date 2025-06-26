import React from 'react';
import { TrendingUp, Users, DollarSign, Calendar, Plane, MapPin } from 'lucide-react';

const BookingAnalytics: React.FC = () => {
  const monthlyData = [
    { month: 'Jan', bookings: 1200, revenue: 180000 },
    { month: 'Feb', bookings: 1350, revenue: 202500 },
    { month: 'Mar', bookings: 1100, revenue: 165000 },
    { month: 'Apr', bookings: 1450, revenue: 217500 },
    { month: 'May', bookings: 1600, revenue: 240000 },
    { month: 'Jun', bookings: 1800, revenue: 270000 }
  ];

  const topRoutes = [
    { route: 'JFK → LAX', bookings: 245, revenue: 73500 },
    { route: 'LAX → ORD', bookings: 198, revenue: 37422 },
    { route: 'MIA → BOS', bookings: 167, revenue: 41583 },
    { route: 'ORD → JFK', bookings: 156, revenue: 46644 },
    { route: 'BOS → MIA', bookings: 134, revenue: 33350 }
  ];

  const loyaltyStats = [
    { tier: 'Bronze', count: 1250, percentage: 45 },
    { tier: 'Silver', count: 890, percentage: 32 },
    { tier: 'Gold', count: 456, percentage: 16 },
    { tier: 'Platinum', count: 194, percentage: 7 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Analytics</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900">8,498</p>
              <p className="text-sm text-green-600">+12.5% from last month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">$1.27M</p>
              <p className="text-sm text-green-600">+8.1% from last month</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Booking Value</p>
              <p className="text-3xl font-bold text-gray-900">$149</p>
              <p className="text-sm text-red-600">-2.3% from last month</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Occupancy Rate</p>
              <p className="text-3xl font-bold text-gray-900">78%</p>
              <p className="text-sm text-green-600">+5.2% from last month</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Plane className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Booking Trends</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(data.bookings / 2000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{data.bookings}</div>
                  <div className="text-xs text-gray-600">${(data.revenue / 1000).toFixed(0)}k</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Routes */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Routes</h3>
          <div className="space-y-4">
            {topRoutes.map((route, index) => (
              <div key={route.route} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{route.route}</p>
                    <p className="text-sm text-gray-600">{route.bookings} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${route.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Loyalty Program Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Loyalty Program Distribution</h3>
          <div className="space-y-4">
            {loyaltyStats.map((tier) => (
              <div key={tier.tier} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    tier.tier === 'Bronze' ? 'bg-orange-400' :
                    tier.tier === 'Silver' ? 'bg-gray-400' :
                    tier.tier === 'Gold' ? 'bg-yellow-400' :
                    'bg-purple-400'
                  }`}></div>
                  <span className="font-medium text-gray-900">{tier.tier}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        tier.tier === 'Bronze' ? 'bg-orange-400' :
                        tier.tier === 'Silver' ? 'bg-gray-400' :
                        tier.tier === 'Gold' ? 'bg-yellow-400' :
                        'bg-purple-400'
                      }`}
                      style={{ width: `${tier.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-16 text-right">
                    {tier.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Status Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Confirmed</span>
              </div>
              <span className="font-semibold text-green-600">7,234 (85%)</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Blocked/Pending</span>
              </div>
              <span className="font-semibold text-yellow-600">892 (10%)</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Cancelled</span>
              </div>
              <span className="font-semibold text-red-600">372 (4%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingAnalytics;