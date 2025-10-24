import React from 'react';

const DateTimeStep = ({ formData, onInputChange, onBack, onDateTimeSelect, timeSlots }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#222] mb-2">Select Date & Time</h3>
        <p className="text-gray-600 text-sm sm:text-base">Choose your preferred appointment slot</p>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Date *</label>
          <input
            type="date"
            name="selectedDate"
            value={formData.selectedDate}
            onChange={onInputChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] focus:border-transparent transition-all text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Time Slot *</label>
          <select
            name="selectedTime"
            value={formData.selectedTime}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] focus:border-transparent transition-all text-sm sm:text-base"
            required
          >
            <option value="">Select a time slot</option>
            {timeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Operating hours: 9:00 AM - 4:00 PM
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onBack}
          className="w-full sm:w-1/2 bg-gray-200 text-[#222] py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base"
        >
          Back
        </button>
        <button
          onClick={onDateTimeSelect}
          disabled={!formData.selectedDate || !formData.selectedTime}
          className="w-full sm:w-1/2 bg-[#f8d816] text-[#222] py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e6c714] transition-colors text-sm sm:text-base"
        >
          Check Availability
        </button>
      </div>
    </div>
  );
};

export default DateTimeStep;