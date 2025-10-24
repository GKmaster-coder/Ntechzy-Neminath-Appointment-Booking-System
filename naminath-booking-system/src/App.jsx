import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your pages
import UserBooking from "./components/UserBooking/UserBooking";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminLogin from "./pages/AdminAuth/AdminLogin";
import AdminSignup from "./pages/AdminAuth/AdminSignup";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("adminLoggedIn");
  return isLoggedIn ? children : <Navigate to="/admin/login" />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 poppins">
      <Routes>
        {/* User Booking Page */}
        <Route path="/" element={<UserBooking />} />

        {/* Admin Auth Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* Protected Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
