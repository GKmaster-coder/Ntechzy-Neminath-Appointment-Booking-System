import React from 'react';

const PersonalInfoStep = ({ formData, onInputChange, onNext }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#C00000] mb-2">Personal Information</h3>
        <p className="text-red-600 text-sm sm:text-base">Please provide your basic details</p>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] focus:border-transparent transition-all text-sm sm:text-base"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] focus:border-transparent transition-all text-sm sm:text-base"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] focus:border-transparent transition-all text-sm sm:text-base"
            placeholder="Enter your email address"
            required
          />
        </div>
      </div>
      
      <button
        onClick={onNext}
        disabled={!formData.name || !formData.phoneNo || !formData.email}
        className="w-full bg-[#f8d816] text-[#222] py-3 sm:py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e6c714] transition-colors shadow-md text-sm sm:text-base"
      >
        Next: Select Date & Time
      </button>
    </div>
  );
};

export default PersonalInfoStep;