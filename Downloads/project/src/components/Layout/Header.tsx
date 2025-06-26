import React from 'react';
import { Plane, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate('home')}
          >
            <Plane className="h-8 w-8" />
            <h1 className="text-2xl font-bold">SkyWings Airlines</h1>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => onNavigate('search')}
                  className={`hover:text-yellow-300 transition-colors ${
                    currentPage === 'search' ? 'text-yellow-300' : ''
                  }`}
                >
                  Search Flights
                </button>
                <button
                  onClick={() => onNavigate('bookings')}
                  className={`hover:text-yellow-300 transition-colors ${
                    currentPage === 'bookings' ? 'text-yellow-300' : ''
                  }`}
                >
                  My Bookings
                </button>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className={`hover:text-yellow-300 transition-colors ${
                      currentPage === 'admin' ? 'text-yellow-300' : ''
                    }`}
                  >
                    Admin Panel
                  </button>
                )}
              </nav>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="text-sm">
                    {user?.firstName} {user?.lastName}
                    <span className="ml-2 px-2 py-1 bg-yellow-500 text-black text-xs rounded-full">
                      {user?.loyaltyTier.toUpperCase()}
                    </span>
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 hover:text-yellow-300 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;