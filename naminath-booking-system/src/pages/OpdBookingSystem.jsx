import React, { useState } from 'react';
import UserBooking from '../components/UserBooking/UserBooking';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';

const OPDBookingSystem = () => {
  const [currentView, setCurrentView] = useState('user'); // 'user' or 'admin'
  
  return (
    <div className="min-h-screen bg-white font-['Poppins'] text-[#222]">
      <header className="bg-[#f8d816] py-4 px-6 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">MediCare Hospital OPD</h1>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'user' 
                  ? 'bg-white text-[#222] shadow-sm' 
                  : 'bg-transparent text-[#222] hover:bg-yellow-500'
              }`}
              onClick={() => setCurrentView('user')}
            >
              Book Appointment
            </button>
            <button 
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'admin' 
                  ? 'bg-white text-[#222] shadow-sm' 
                  : 'bg-transparent text-[#222] hover:bg-yellow-500'
              }`}
              onClick={() => setCurrentView('admin')}
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        {currentView === 'user' ? <UserBooking /> : <AdminDashboard />}
      </main>

      <footer className="bg-gray-100 py-4 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>© 2024 MediCare Hospital. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default OPDBookingSystem;