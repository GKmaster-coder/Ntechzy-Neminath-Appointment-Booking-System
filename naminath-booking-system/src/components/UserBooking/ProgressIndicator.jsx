import React, { useEffect, useRef } from "react";

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const stepLabels =
    totalSteps === 6
      ? [
          "Personal Info",
          "Date & Time",
          "OPD Selection",
          "Case Form",
          "Payment",
          "Confirmation",
        ]
      : [
          "Personal Info",
          "Date & Time",
          "OPD Selection",
          "Payment",
          "Confirmation",
        ];

  const containerRef = useRef(null);

  // 🔄 Auto-scroll active step into view on mobile
  useEffect(() => {
    if (containerRef.current) {
      const activeStep = containerRef.current.querySelector(
        `[data-step="${currentStep}"]`
      );
      if (activeStep) {
        activeStep.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [currentStep]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-auto scrollbar-hide mb-6 sm:mb-8"
    >
      {/* Progress bar container */}
      <div className="flex justify-between items-start relative px-3 sm:px-8 min-w-max gap-4 sm:gap-0">
        {/* Base gray line */}
        <div className="absolute top-[18px] left-6 right-6 h-1 bg-gray-200 -z-10"></div>

        {/* Active progress bar */}
        <div
          className="absolute top-[18px] left-6 h-1 bg-[#f8d816] -z-10 transition-all duration-300"
          style={{
            width: `calc(${((currentStep - 1) / (totalSteps - 1)) * 100}% - 0.4rem)`,
          }}
        ></div>

        {/* Step Circles */}
        {stepLabels.map((label, index) => (
          <div
            key={index + 1}
            data-step={index + 1}
            className="flex flex-col items-center flex-shrink-0 text-center w-14 sm:w-20"
          >
            {/* Circle */}
            <div
              className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                currentStep >= index + 1
                  ? "bg-[#f8d816] border-[#f8d816] text-[#222]"
                  : "bg-white border-gray-300 text-gray-500"
              }`}
            >
              {currentStep > index + 1 ? (
                <svg
                  className="w-3.5 h-3.5 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="font-semibold text-[11px] sm:text-base">
                  {index + 1}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className={`text-[9px] sm:text-xs mt-1 sm:mt-2 font-medium leading-tight ${
                currentStep >= index + 1 ? "text-[#222]" : "text-gray-500"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
