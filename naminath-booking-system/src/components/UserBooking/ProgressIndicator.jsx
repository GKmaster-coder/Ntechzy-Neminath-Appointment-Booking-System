import React from 'react';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const stepLabels = [
    'Personal Info',
    'Date & Time',
    'OPD Selection',
    'Payment',
    'Confirmation'
  ];

  return (
    <div className="flex justify-between mb-6 sm:mb-8 relative px-2 sm:px-0">
      <div className="absolute top-4 left-2 right-2 sm:left-8 sm:right-8 h-1 bg-gray-200 -z-10"></div>
      <div 
        className="absolute top-4 left-2 h-1 bg-[#f8d816] -z-10 transition-all duration-300"
        style={{ width: `calc(${((currentStep - 1) / (totalSteps - 1)) * 100}% - 1rem)` }}
      ></div>
      
      {stepLabels.map((label, index) => (
        <div key={index + 1} className="flex flex-col items-center z-10">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all ${
            currentStep >= index + 1 
              ? 'bg-[#f8d816] border-[#f8d816] text-[#222]' 
              : 'bg-white border-gray-300 text-gray-500'
          }`}>
            {currentStep > index + 1 ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span className="font-semibold text-sm sm:text-base">{index + 1}</span>
            )}
          </div>
          <span className={`text-xs mt-1 sm:mt-2 font-medium text-center ${
            currentStep >= index + 1 ? 'text-[#222]' : 'text-gray-500'
          }`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;