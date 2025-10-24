import React from 'react';

const ConfirmationStep = ({ formData, onBack, onConfirm }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#222] mb-2">Confirm Your Booking</h3>
        <p className="text-gray-600 text-sm sm:text-base">Review your appointment details</p>
      </div>
      
      <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-[#222]">Payment Successful!</h4>
        </div>
        
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <div className="space-y-2 sm:space-y-3">
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">Patient Name</div>
              <div className="font-semibold text-[#222] text-sm sm:text-base">{formData.name}</div>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">Phone Number</div>
              <div className="font-semibold text-[#222] text-sm sm:text-base">{formData.phoneNo}</div>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">Email</div>
              <div className="font-semibold text-[#222] text-sm sm:text-base">{formData.email}</div>
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">Appointment Date</div>
              <div className="font-semibold text-[#222] text-sm sm:text-base">{formData.selectedDate}</div>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">Time Slot</div>
              <div className="font-semibold text-[#222] text-sm sm:text-base">{formData.selectedTime}</div>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">OPD Room</div>
              <div className="font-bold text-base sm:text-lg text-[#222]">OPD {formData.selectedOPD}</div>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">Payment ID</div>
              <div className="font-semibold text-[#222] text-xs sm:text-sm">{formData.paymentIntentId}</div>
            </div>
          </div>
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
          onClick={onConfirm}
          className="w-full sm:w-1/2 bg-[#f8d816] text-[#222] py-3 rounded-lg font-semibold hover:bg-[#e6c714] transition-colors shadow-md text-sm sm:text-base"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;