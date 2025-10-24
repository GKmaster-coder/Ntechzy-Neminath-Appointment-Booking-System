import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminSignup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const adminData = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    localStorage.setItem("adminData", JSON.stringify(adminData));
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7e6] px-4 sm:px-6 poppins">
      <div className="bg-white shadow-lg rounded-xl border-t-8 border-[#FFD700] p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#C00000]">
          Admin Signup
        </h2>
        {error && <p className="text-red-600 text-sm sm:text-base text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block font-medium mb-1 text-[#222]">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-[#222]">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-sm sm:text-base"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-[#222]">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-3 md:py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#C00000] text-white py-3 sm:py-3 rounded-lg font-semibold hover:bg-[#a00000] transition-all text-sm sm:text-base"
          >
            Signup
          </button>
        </form>
        <p className="text-sm sm:text-base text-center mt-5 text-[#333]">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-[#C00000] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
