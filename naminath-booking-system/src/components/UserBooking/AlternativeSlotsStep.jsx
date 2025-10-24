import React from 'react';

const AlternativeSlotsStep = ({ formData, suggestedSlots, onAlternativeSelect, onBack }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#222] mb-2">No Available OPD Rooms</h3>
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 font-medium text-sm sm:text-base">
              All OPD rooms are booked for <span className="font-semibold">{formData.selectedDate}</span> at <span className="font-semibold">{formData.selectedTime}</span>
            </p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
          Here are some alternative time slots with available OPD rooms:
        </p>
        
        {suggestedSlots.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {suggestedSlots.map((slot, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:border-[#f8d816] hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                  <div className="text-center sm:text-left">
                    <div className="font-semibold text-[#222] text-sm sm:text-base">{slot.date} at {slot.time}</div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {slot.availableOPDs} OPD room{slot.availableOPDs > 1 ? 's' : ''} available
                    </div>
                  </div>
                  <button
                    onClick={() => onAlternativeSelect(slot.date, slot.time)}
                    className="bg-[#f8d816] text-[#222] px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-[#e6c714] transition-colors text-sm sm:text-base"
                  >
                    Select This Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 sm:py-6">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 font-medium text-sm sm:text-base">No alternative slots available. Please try a different date.</p>
          </div>
        )}
        
        <button
          onClick={onBack}
          className="w-full bg-gray-200 text-[#222] py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors mt-3 sm:mt-4 text-sm sm:text-base"
        >
          Back to Date & Time Selection
        </button>
      </div>
    </div>
  );
};

export default AlternativeSlotsStep;