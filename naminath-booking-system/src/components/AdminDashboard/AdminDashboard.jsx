import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointments,
  updateAppointmentStatus,
  selectAllAppointments,
  selectAdminLoading,
  selectAdminError,
} from "../../store/slices/appointmentSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(selectAllAppointments);
  const loading = useSelector(selectAdminLoading);
  const error = useSelector(selectAdminError);

  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterOPD, setFilterOPD] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [gotoPage, setGotoPage] = useState("");
  const entriesPerPage = 5;

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateAppointmentStatus({ id, status })).unwrap();
      dispatch(getAllAppointments());
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update appointment status. Please try again.");
    }
  };

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

  const filtered = bookings.filter(
    (b) =>
      (filterDate ? b.date === filterDate : true) &&
      (filterStatus === "all" || b.status === filterStatus) &&
      (filterOPD === "all" || b.opd.toString() === filterOPD)
  );

  const totalPages = Math.ceil(filtered.length / entriesPerPage);
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentEntries = filtered.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const total = bookings.length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const pending = bookings.filter((b) => b.status === "pending").length;

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-12 xl:px-16 poppins">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#222] mb-2">
            OPD Booking Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage and monitor all OPD appointments efficiently
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>{error}</span>
            <button
              onClick={() => dispatch(getAllAppointments())}
              className="text-red-700 hover:text-red-900 font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { title: "Total", count: total, color: "#f8d816" },
            { title: "Confirmed", count: confirmed, color: "#10b981" },
            { title: "Pending", count: pending, color: "#f59e0b" },
            { title: "Cancelled", count: cancelled, color: "#ef4444" },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6 border-l-4 hover:shadow-lg transition-all duration-200"
              style={{ borderColor: card.color }}
            >
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                {card.title}
              </p>
              <p
                className="text-2xl sm:text-3xl font-bold mt-1"
                style={{ color: card.color }}
              >
                {card.count}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <h3 className="text-lg sm:text-xl font-semibold text-[#222]">
              Filter Appointments
            </h3>
            <button
              onClick={() => dispatch(getAllAppointments())}
              className="px-5 py-2 bg-[#f8d816] text-[#222] rounded-lg font-semibold hover:bg-[#e6c714] transition"
              disabled={loading}
            >
              Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-[#f8d816]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-[#f8d816]"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OPD Room
              </label>
              <select
                value={filterOPD}
                onChange={(e) => setFilterOPD(e.target.value)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-[#f8d816]"
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

          <div className="flex justify-end">
            <button
              onClick={() => {
                setFilterDate("");
                setFilterStatus("all");
                setFilterOPD("all");
              }}
              className="px-5 py-2 bg-gray-200 text-[#222] rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-base sm:text-lg font-semibold text-[#222]">
              Appointment List
            </h3>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden">
            {currentEntries.length > 0 ? (
              currentEntries.map((b) => (
                <div
                  key={b.id}
                  className="border-b border-gray-200 p-4 text-sm space-y-2"
                >
                  <p className="font-semibold text-[#222]">{b.name}</p>
                  <p className="text-gray-600">{b.phoneNo}</p>
                  <p className="text-gray-600 text-xs">{b.email}</p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(b.date).toLocaleDateString("en-IN")} at {b.time}
                  </p>
                  <p>
                    <strong>OPD:</strong>{" "}
                    <span className="px-2 py-1 bg-[#f8d816]/20 rounded-lg text-[#222] text-xs">
                      OPD {b.opd}
                    </span>
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : b.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <p className="p-6 text-center text-gray-500">
                No bookings found matching filters.
              </p>
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full text-sm">
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
                      className="py-3.5 px-6 text-left font-semibold text-gray-700 uppercase tracking-wide"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentEntries.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition">
                    <td className="py-3.5 px-6 font-medium text-[#222]">
                      {b.name}
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="font-medium">{b.phoneNo}</div>
                      <div className="text-xs text-gray-500">{b.email}</div>
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="font-medium">
                        {new Date(b.date).toLocaleDateString("en-IN")}
                      </div>
                      <div className="text-xs text-gray-500">{b.time}</div>
                    </td>
                    <td className="py-3.5 px-6 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-[#f8d816]/20 text-[#222] font-semibold border border-[#f8d816]/30 text-xs">
                        OPD {b.opd}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 whitespace-nowrap">
                      {b.fillCaseForm ? (
                        <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium border border-green-200">
                          Filled
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
                          Not Filled
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          b.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : b.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 whitespace-nowrap">
                      <div className="flex flex-wrap gap-2">
                        {b.status !== "confirmed" && (
                          <button
                            onClick={() =>
                              handleStatusChange(b.id, "confirmed")
                            }
                            className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600 transition"
                            disabled={loading}
                          >
                            Confirm
                          </button>
                        )}
                        {b.status !== "cancelled" && (
                          <button
                            onClick={() =>
                              handleStatusChange(b.id, "cancelled")
                            }
                            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filtered.length > 5 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 text-[#222] rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-300 transition"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    currentPage === i + 1
                      ? "bg-[#f8d816] text-[#222]"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 text-[#222] rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-300 transition"
              >
                Next
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span>Go to:</span>
              <input
                type="number"
                value={gotoPage}
                onChange={(e) => setGotoPage(e.target.value)}
                className="w-14 px-2 py-1 border rounded-md text-center"
                min="1"
                max={totalPages}
              />
              <button
                onClick={() => {
                  const page = parseInt(gotoPage);
                  if (!isNaN(page)) {
                    if (page < 1) setCurrentPage(1);
                    else if (page > totalPages) setCurrentPage(totalPages);
                    else setCurrentPage(page);
                  }
                }}
                className="px-3 py-1 bg-[#f8d816] text-[#222] rounded-lg font-semibold hover:bg-[#e6c714] transition"
              >
                Go
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
