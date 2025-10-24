import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedAdmin = JSON.parse(localStorage.getItem("adminData"));

    if (storedAdmin && storedAdmin.email === form.email && storedAdmin.password === form.password) {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7e6] px-4 sm:px-6">
      <div className="bg-white shadow-lg rounded-xl border-t-8 border-[#FFD700] p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#C00000]">
          Admin Login
        </h2>
        {error && (
          <p className="text-red-600 text-sm sm:text-base text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block font-medium mb-1 text-[#222]">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-[#222]">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#C00000] text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#a00000] transition-all"
          >
            Login
          </button>
        </form>
        <p className="text-sm sm:text-base text-center mt-5 text-[#333]">
          Don’t have an account?{" "}
          <Link
            to="/admin/signup"
            className="text-[#C00000] font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
