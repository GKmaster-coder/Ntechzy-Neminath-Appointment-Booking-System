import React from "react";

const OPDSelectionStep = ({
  formData,
  availableOPDs,
  onOPDSelect,
  onBack,
  onNext,
  onInputChange,
}) => {
  // ✅ Toggle OPD selection logic
  const handleOPDClick = (opd) => {
    if (formData.selectedOPD === opd) {
      // Deselect if same OPD is clicked again
      onOPDSelect(null);
    } else {
      // Select new OPD
      onOPDSelect(opd);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#222] mb-2">
          Select OPD Room
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Available for{" "}
          <span className="font-semibold text-[#222]">{formData.selectedDate}</span>{" "}
          at{" "}
          <span className="font-semibold text-[#222]">{formData.selectedTime}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {availableOPDs.map((opd) => (
          <button
            key={opd}
            onClick={() => handleOPDClick(opd)}
            className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-center ${
              formData.selectedOPD === opd
                ? "border-[#f8d816] bg-yellow-50 shadow-lg scale-105"
                : "border-gray-200 hover:border-[#f8d816] hover:bg-yellow-50 hover:shadow-md"
            }`}
          >
            <div className="text-lg sm:text-2xl font-bold text-[#222] mb-1 sm:mb-2">
              OPD {opd}
            </div>
            <div className="text-xs sm:text-sm text-green-600 font-semibold flex items-center justify-center">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Available
            </div>
          </button>
        ))}
      </div>

      {/* Case Description */}
      <div>
        <label className="block text-sm font-medium text-[#222] mb-1">
          Describe why you need treatment
        </label>
        <textarea
          name="caseDescription"
          value={formData.caseDescription || ""}
          onChange={onInputChange}
          rows="4"
          className="w-full border rounded-md p-3"
          placeholder="Describe your symptoms, problems, or reason for visit..."
        />
      </div>

      {/* Checkbox */}
      <div className="flex items-start sm:items-center space-x-2">
        <input
          type="checkbox"
          id="fillCaseForm"
          name="fillCaseForm"
          checked={formData.fillCaseForm || false}
          onChange={onInputChange}
          className="mt-1 sm:mt-0 w-4 h-4 border-gray-300 text-[#f8d816] focus:ring-[#f8d816] rounded"
        />
        <label
          htmlFor="fillCaseForm"
          className="text-sm sm:text-base text-[#222] select-none"
        >
          I want to fill the detailed case form
        </label>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onBack}
          className="w-full sm:w-1/2 bg-gray-200 text-[#222] py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base"
        >
          Back
        </button>

        <button
          onClick={() => onNext(4)}
          disabled={!formData.selectedOPD}
          className="w-full sm:w-1/2 bg-[#f8d816] text-[#222] py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e6c714] transition-colors text-sm sm:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OPDSelectionStep;
