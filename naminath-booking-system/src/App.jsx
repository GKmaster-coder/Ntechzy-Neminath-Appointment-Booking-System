import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Import your pages
import UserBooking from "./components/UserBooking/UserBooking";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminLogin from "./pages/AdminAuth/AdminLogin";
import AdminSignup from "./pages/AdminAuth/AdminSignup";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { token } = useSelector((state) => state.auth);
  const savedToken = localStorage.getItem("authToken");

  const isAuthenticated = token || savedToken;

  return (
    <div className="min-h-screen bg-white text-gray-800 poppins">
      <Routes>
        {/* User Booking Page */}
        <Route path="/" element={<UserBooking />} />

        {/* Admin Auth Pages (redirect if already logged in) */}
        <Route
          path="/admin/login"
          element={
            isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />
          }
        />

        <Route
          path="/admin/signup"
          element={
            isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminSignup />
          }
        />

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
