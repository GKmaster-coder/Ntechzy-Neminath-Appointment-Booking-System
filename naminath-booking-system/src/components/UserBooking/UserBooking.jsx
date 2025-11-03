import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressIndicator from "./ProgressIndicator";
import PersonalInfoStep from "./PersonalInfoStep";
import DateTimeStep from "./DateTimeStep";
import OPDSelectionStep from "./OPDSelectionStep";
import CaseFormStep from "./CaseFormStep";
import PaymentStep from "./PaymentStep";
import ConfirmationStep from "./ConfirmationStep";
import AlternativeSlotsStep from "./AlternativeSlotsStep";
import {
  updateFormData,
  setCurrentStep,
  checkAvailability,
  createAppointment,
  resetForm,
  selectFormData,
  selectCurrentStep,
  selectAvailableOPDs,
  selectLoading,
  selectError,
  selectAppointmentDetails,
  setAvailableOPDs,
} from "../../store/slices/appointmentSlice"; // Adjust path

const UserBooking = () => {
  const dispatch = useDispatch();

  // Redux state
  const formData = useSelector(selectFormData);
  const step = useSelector(selectCurrentStep);
  const availableOPDs = useSelector(selectAvailableOPDs);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const appointmentDetails = useSelector(selectAppointmentDetails);

  // Calculate total steps based on case form
  const totalSteps = formData.fillCaseForm ? 6 : 5;

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 16; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      updateFormData({
        [name]: type === "checkbox" ? checked : value,
      })
    );
  };

  // Handle date & time selection
  const handleDateTimeSelect = async () => {
    if (!formData.selectedDate || !formData.selectedTime) {
      alert("Please select both date and time");
      return;
    }

    const selectedHour = parseInt(formData.selectedTime.split(":")[0]);
    if (selectedHour < 10 || selectedHour >= 16) {
      alert("Please select a time between 10:00 AM and 4:00 PM");
      return;
    }

    try {
      // Check availability via API
      const result = await dispatch(
        checkAvailability({
          date: formData.selectedDate,
          time: formData.selectedTime,
        })
      ).unwrap();

      // If slots available, move to OPD selection
      // Otherwise, the slice will handle showing alternative slots
    } catch (err) {
      console.error("Availability check failed:", err);
      alert("Failed to check availability. Please try again.");
    }
  };

  // Handle OPD selection
  const handleOPDSelect = (opd) => {
    dispatch(updateFormData({ selectedOPD: opd }));
  };

  // Handle payment success
  const handlePaymentSuccess = (paymentMethod) => {
    dispatch(updateFormData({ paymentMethod }));
    dispatch(setCurrentStep(totalSteps)); // Go to confirmation step
  };

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    try {
      // Prepare appointment data
      const appointmentData = {
        name: formData.name,
        phoneNo: formData.phoneNo,
        email: formData.email,
        selectedDate: formData.selectedDate,
        selectedTime: formData.selectedTime,
        selectedOPD: formData.selectedOPD,
        caseDescription: formData.caseDescription || "",
        fillCaseForm: formData.fillCaseForm,
        caseForm: formData.fillCaseForm ? formData.caseForm : {},
      };

      // Create appointment via API
      await dispatch(createAppointment(appointmentData)).unwrap();

      alert("Booking confirmed successfully!");

      // Reset form
      dispatch(resetForm());
    } catch (err) {
      console.error("Booking failed:", err);
      alert(`Failed to confirm booking: ${err}`);
    }
  };

  // Handle alternative slot selection
  const handleAlternativeSelect = async (date, time) => {
    dispatch(
      updateFormData({
        selectedDate: date,
        selectedTime: time,
      })
    );

    try {
      await dispatch(
        checkAvailability({
          date,
          time,
        })
      ).unwrap();
    } catch (err) {
      console.error("Availability check failed:", err);
      alert("Failed to check availability. Please try again.");
    }
  };

  // Show error message
  useEffect(() => {
    if (error) {
      console.error("Appointment error:", error);
    }
  }, [error]);

  const renderStep = () => {
    if (formData.fillCaseForm) {
      // ✅ With Case Form (6 steps)
      switch (step) {
        case 1:
          return (
            <PersonalInfoStep
              formData={formData}
              onInputChange={handleInputChange}
              onNext={() => dispatch(setCurrentStep(2))}
            />
          );
        case 2:
          return (
            <DateTimeStep
              formData={formData}
              onInputChange={handleInputChange}
              onBack={() => dispatch(setCurrentStep(1))}
              onDateTimeSelect={handleDateTimeSelect}
              timeSlots={generateTimeSlots()}
              loading={loading}
            />
          );
        case 3:
          return (
            <OPDSelectionStep
              formData={formData}
              availableOPDs={availableOPDs}
              onOPDSelect={handleOPDSelect}
              onBack={() => dispatch(setCurrentStep(2))}
              onNext={(nextStep) => dispatch(setCurrentStep(nextStep))}
              onInputChange={handleInputChange}
            />
          );
        case 4:
          return (
            <CaseFormStep
              formData={formData}
              onInputChange={handleInputChange}
              onBack={() => dispatch(setCurrentStep(3))}
              onNext={() => dispatch(setCurrentStep(5))}
            />
          );
        case 5:
          return (
            <PaymentStep
              formData={formData}
              onPaymentSuccess={handlePaymentSuccess}
              onBack={() => dispatch(setCurrentStep(4))}
            />
          );
        case 6:
          return (
            <ConfirmationStep
              formData={formData}
              onBack={() => dispatch(setCurrentStep(5))}
              onConfirm={handleConfirmBooking}
              loading={loading}
            />
          );
        default:
          return null;
      }
    } else {
      // ✅ Without Case Form (5 steps)
      switch (step) {
        case 1:
          return (
            <PersonalInfoStep
              formData={formData}
              onInputChange={handleInputChange}
              onNext={() => dispatch(setCurrentStep(2))}
            />
          );
        case 2:
          return (
            <DateTimeStep
              formData={formData}
              onInputChange={handleInputChange}
              onBack={() => dispatch(setCurrentStep(1))}
              onDateTimeSelect={handleDateTimeSelect}
              timeSlots={generateTimeSlots()}
              loading={loading}
            />
          );
        case 3:
          return (
            <OPDSelectionStep
              formData={formData}
              availableOPDs={availableOPDs}
              onOPDSelect={handleOPDSelect}
              onBack={() => dispatch(setCurrentStep(2))}
              onNext={(nextStep) => dispatch(setCurrentStep(nextStep))}
              onInputChange={handleInputChange}
            />
          );
        case 4:
          return (
            <PaymentStep
              formData={formData}
              onPaymentSuccess={handlePaymentSuccess}
              onBack={() => dispatch(setCurrentStep(3))}
            />
          );
        case 5:
          return (
            <ConfirmationStep
              formData={formData}
              onBack={() => dispatch(setCurrentStep(4))}
              onConfirm={handleConfirmBooking}
              loading={loading}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fff7e6] py-4 px-3 sm:py-8 sm:px-4 poppins">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#C00000] mb-2">
            Book Appointment
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Complete the form to schedule your OPD appointment
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <ProgressIndicator currentStep={step} totalSteps={totalSteps} />

        {renderStep()}
      </div>
    </div>
  );
};

export default UserBooking;
