import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterOPD, setFilterOPD] = useState("all");

  useEffect(() => {
    const savedBookings = localStorage.getItem("opdBookings");
    if (savedBookings) setBookings(JSON.parse(savedBookings));
  }, []);

  const handleStatusChange = (id, status) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status } : b
    );
    setBookings(updated);
    localStorage.setItem("opdBookings", JSON.stringify(updated));
  };

  const filtered = bookings.filter(
    (b) =>
      (filterDate ? b.date === filterDate : true) &&
      (filterStatus === "all" || b.status === filterStatus) &&
      (filterOPD === "all" || b.opd.toString() === filterOPD)
  );

  const total = bookings.length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const todayBookings = bookings.filter(
    (b) => b.date === new Date().toISOString().split("T")[0]
  ).length;

  const uniqueDates = [...new Set(bookings.map((b) => b.date))].sort();

  // Generate time slots for reference (same as UserBooking component)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 16; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 poppins">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#222] mb-2">OPD Booking Dashboard</h1>
          <p className="text-gray-600">Manage and monitor all OPD appointments efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Bookings",
              count: total,
              color: "#f8d816",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              ),
            },
            {
              title: "Confirmed",
              count: confirmed,
              color: "#10b981",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ),
            },
            {
              title: "Cancelled",
              count: cancelled,
              color: "#ef4444",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ),
            },
            {
              title: "Today's Bookings",
              count: todayBookings,
              color: "#3b82f6",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              ),
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 transition-all hover:shadow-xl"
              style={{ borderColor: card.color }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {card.title}
                  </p>
                  <p
                    className="text-3xl font-bold mt-1"
                    style={{ color: card.color }}
                  >
                    {card.count}
                  </p>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <svg
                    className="w-6 h-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{ color: card.color }}
                  >
                    {card.icon}
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-[#222] mb-4">
            Filter Appointments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] focus:border-transparent transition-all"
              >
                <option value="">All Dates</option>
                {uniqueDates.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] focus:border-transparent transition-all"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* OPD Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OPD Room
              </label>
              <select
                value={filterOPD}
                onChange={(e) => setFilterOPD(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] focus:border-transparent transition-all"
              >
                <option value="all">All OPDs</option>
                {[1, 2, 3, 4, 5].map((opd) => (
                  <option key={opd} value={opd}>
                    OPD {opd}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                setFilterDate("");
                setFilterStatus("all");
                setFilterOPD("all");
              }}
              className="px-5 py-2 bg-gray-200 text-[#222] rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-[#222]">
              Appointment List
            </h3>
            {filtered.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                Showing {filtered.length} of {total} bookings
              </p>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Patient",
                    "Contact",
                    "Date & Time",
                    "OPD",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-4 px-6 text-left font-semibold text-gray-700 uppercase tracking-wide"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.length > 0 ? (
                  filtered.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6 font-medium text-[#222]">
                        {b.name}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        <div className="font-medium">{b.phoneNo}</div>
                        <div className="text-sm text-gray-500">{b.email}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-[#222]">{b.date}</div>
                        <div className="text-sm text-gray-500">{b.time}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full bg-[#f8d816]/20 text-[#222] font-semibold border border-[#f8d816]/30">
                          OPD {b.opd}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            b.status === "confirmed"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {b.status === "confirmed" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(b.id, "cancelled")
                            }
                            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-sm"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(b.id, "confirmed")
                            }
                            className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-sm"
                          >
                            Confirm
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-12 text-center text-gray-500 font-medium"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        No bookings found matching your filters
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Summary */}
        {filtered.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 bg-white rounded-lg p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-medium">
                Displaying {filtered.length} booking{filtered.length !== 1 && "s"}
              </span>
              {filterDate && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Date: {filterDate}
                </span>
              )}
              {filterStatus !== "all" && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  Status: {filterStatus}
                </span>
              )}
              {filterOPD !== "all" && (
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                  OPD: {filterOPD}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;