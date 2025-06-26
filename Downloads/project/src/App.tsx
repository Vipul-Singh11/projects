import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Landing from './components/Home/Landing';
import Login from './components/Auth/Login';
import FlightSearch from './components/Flights/FlightSearch';
import BookingFlow from './components/Booking/BookingFlow';
import BookingHistory from './components/Bookings/BookingHistory';
import AdminPanel from './components/Admin/AdminPanel';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState<any>(null);
  const { isAuthenticated } = useAuth();

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
  };

  const renderPage = () => {
    if (!isAuthenticated && currentPage !== 'home' && currentPage !== 'login') {
      return <Login onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'home':
        return <Landing onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'search':
        return <FlightSearch onNavigate={handleNavigate} />;
      case 'booking':
        return pageData?.flight ? (
          <BookingFlow flight={pageData.flight} onNavigate={handleNavigate} />
        ) : (
          <FlightSearch onNavigate={handleNavigate} />
        );
      case 'bookings':
        return <BookingHistory onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPanel onNavigate={handleNavigate} />;
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'login' && (
        <Header onNavigate={handleNavigate} currentPage={currentPage} />
      )}
      {renderPage()}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;