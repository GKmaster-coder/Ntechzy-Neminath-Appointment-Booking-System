import React from "react";
import CaseForm from "./CaseForm";

const CaseFormStep = ({ formData, onInputChange, onBack, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(); // move to next step (Payment)
  };

  return (
    <div className="bg-gray-50 py-6 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#222] mb-2">
            Complete Case Form
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Please fill in the details carefully. This helps us understand your case better.
          </p>
        </div>

        {/* Case Form */}
        <form onSubmit={handleSubmit}>
          <CaseForm formData={formData} onInputChange={onInputChange} />

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto bg-gray-200 text-[#222] py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Back
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#f8d816] text-[#222] py-3 px-6 rounded-lg font-semibold hover:bg-[#e6c714] transition-colors"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaseFormStep;
