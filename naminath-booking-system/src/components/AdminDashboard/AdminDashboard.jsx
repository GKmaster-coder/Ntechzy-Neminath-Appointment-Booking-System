import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointments,
  updateAppointmentStatus,
  selectAllAppointments,
  selectAdminLoading,
  selectAdminError,
} from "../../store/slices/appointmentSlice"; // Adjust path as needed

const AdminDashboard = () => {
  const dispatch = useDispatch();
  
  // Redux state
  const appointments = useSelector(selectAllAppointments);
  const loading = useSelector(selectAdminLoading);
  const error = useSelector(selectAdminError);
  
  // Local state for filters
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterOPD, setFilterOPD] = useState("all");

  // Fetch appointments on component mount
  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  // Handle status change with API call
  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateAppointmentStatus({ id, status })).unwrap();
      // Optionally refresh the list
      dispatch(getAllAppointments());
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update appointment status. Please try again.");
    }
  };

  // Map API data to component format
  const bookings = appointments.map((apt) => ({
    id: apt._id,
    name: apt.name,
    phoneNo: apt.phoneNo,
    email: apt.email,
    date: apt.selectedDate,
    time: apt.selectedTime,
    opd: apt.selectedOPD,
    status: apt.status,
    caseDescription: apt.caseDescription,
    fillCaseForm: apt.fillCaseForm,
    caseFormId: apt.caseFormId,
  }));

  // Filter logic
  const filtered = bookings.filter(
    (b) =>
      (filterDate ? b.date === filterDate : true) &&
      (filterStatus === "all" || b.status === filterStatus) &&
      (filterOPD === "all" || b.opd.toString() === filterOPD)
  );

  // Statistics
  const total = bookings.length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const todayBookings = bookings.filter(
    (b) => b.date === new Date().toISOString().split("T")[0]
  ).length;

  const uniqueDates = [...new Set(bookings.map((b) => b.date))].sort();

  // Loading state
  if (loading && bookings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#f8d816] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 poppins">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#222] mb-2">OPD Booking Dashboard</h1>
          <p className="text-gray-600">Manage and monitor all OPD appointments efficiently</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
            <button 
              onClick={() => dispatch(getAllAppointments())}
              className="text-red-700 hover:text-red-900 font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

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
              title: "Pending",
              count: pending,
              color: "#f59e0b",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#222]">
              Filter Appointments
            </h3>
            <button
              onClick={() => dispatch(getAllAppointments())}
              className="px-4 py-2 bg-[#f8d816] text-[#222] rounded-lg font-semibold hover:bg-[#e0c614] transition-colors flex items-center gap-2"
              disabled={loading}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
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
                    {new Date(d).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
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
                <option value="pending">Pending</option>
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
                    "Case Form",
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
                        <div className="font-medium text-[#222]">
                          {new Date(b.date).toLocaleDateString('en-IN', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="text-sm text-gray-500">{b.time}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full bg-[#f8d816]/20 text-[#222] font-semibold border border-[#f8d816]/30">
                          OPD {b.opd}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {b.fillCaseForm ? (
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium border border-green-200">
                            Filled
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
                            Not Filled
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            b.status === "confirmed"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : b.status === "cancelled"
                              ? "bg-red-100 text-red-800 border border-red-200"
                              : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                          }`}
                        >
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          {b.status !== "confirmed" && (
                            <button
                              onClick={() => handleStatusChange(b.id, "confirmed")}
                              className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors shadow-sm"
                              disabled={loading}
                            >
                              Confirm
                            </button>
                          )}
                          {b.status !== "cancelled" && (
                            <button
                              onClick={() => handleStatusChange(b.id, "cancelled")}
                              className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors shadow-sm"
                              disabled={loading}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
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
                  Date: {new Date(filterDate).toLocaleDateString('en-IN')}
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
