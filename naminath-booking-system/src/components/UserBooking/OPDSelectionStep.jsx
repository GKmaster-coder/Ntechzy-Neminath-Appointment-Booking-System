import React from "react";
import CaseForm from "./CaseForm";

const OPDSelectionStep = ({
  formData,
  availableOPDs,
  onOPDSelect,
  onBack,
  onNext,
  onInputChange,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#222] mb-2">
          Select OPD Room
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Available for{" "}
          <span className="font-semibold text-[#222]">
            {formData.selectedDate}
          </span>{" "}
          at{" "}
          <span className="font-semibold text-[#222]">
            {formData.selectedTime}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {availableOPDs.map((opd) => (
          <button
            key={opd}
            onClick={() => onOPDSelect(opd)}
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

      {/* Case Description Textarea */}
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

      {/* Optional Case Form Component */}
      <CaseForm formData={formData} onInputChange={onInputChange} />

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onBack}
          className="w-full sm:w-1/2 bg-gray-200 text-[#222] py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!formData.selectedOPD}
          className="w-full sm:w-1/2 bg-[#f8d816] text-[#222] py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e6c714] transition-colors text-sm sm:text-base"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default OPDSelectionStep;
