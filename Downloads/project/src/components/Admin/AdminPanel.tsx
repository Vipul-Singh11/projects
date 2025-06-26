import React, { useState } from 'react';
import { Plus, Edit, Trash2, Plane, Users, Calendar, TrendingUp } from 'lucide-react';
import FlightManagement from './FlightManagement';
import BookingAnalytics from './BookingAnalytics';

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'flights' | 'bookings' | 'analytics'>('overview');

  const stats = [
    {
      title: 'Total Flights',
      value: '156',
      icon: Plane,
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Bookings',
      value: '2,341',
      icon: Users,
      change: '+5.2%',
      changeType: 'positive'
    },
    {
      title: 'Today\'s Flights',
      value: '23',
      icon: Calendar,
      change: '+2',
      changeType: 'positive'
    },
    {
      title: 'Revenue',
      value: '$127,420',
      icon: TrendingUp,
      change: '+8.1%',
      changeType: 'positive'
    }
  ];

  const recentBookings = [
    { id: '1', passenger: 'John Doe', flight: 'SW101', amount: '$299', status: 'confirmed' },
    { id: '2', passenger: 'Jane Smith', flight: 'SW202', amount: '$189', status: 'blocked' },
    { id: '3', passenger: 'Bob Johnson', flight: 'SW303', amount: '$249', status: 'confirmed' },
    { id: '4', passenger: 'Alice Brown', flight: 'SW101', amount: '$299', status: 'pending' },
    { id: '5', passenger: 'Charlie Wilson', flight: 'SW202', amount: '$189', status: 'confirmed' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'flights':
        return <FlightManagement />;
      case 'analytics':
        return <BookingAnalytics />;
      case 'overview':
      default:
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{booking.passenger}</p>
                        <p className="text-sm text-gray-600">Flight {booking.flight}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{booking.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'blocked'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('flights')}
                    className="w-full flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="h-5 w-5 text-blue-600" />
                    <span className="text-blue-600 font-medium">Add New Flight</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Edit className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-600 font-medium">Manage Aircraft</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <TrendingUp className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-600 font-medium">View Analytics</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Users className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-600 font-medium">Customer Support</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage flights, bookings, and system operations</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex space-x-1 p-1">
            {[
              { key: 'overview', label: 'Overview', icon: TrendingUp },
              { key: 'flights', label: 'Flight Management', icon: Plane },
              { key: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;