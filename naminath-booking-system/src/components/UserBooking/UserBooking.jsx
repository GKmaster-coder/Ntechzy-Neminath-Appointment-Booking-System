import React, { useState } from "react";
import ProgressIndicator from "./ProgressIndicator";
import PersonalInfoStep from "./PersonalInfoStep";
import DateTimeStep from "./DateTimeStep";
import OPDSelectionStep from "./OPDSelectionStep";
import CaseFormStep from "./CaseFormStep";
import PaymentStep from "./PaymentStep";
import ConfirmationStep from "./ConfirmationStep";
import AlternativeSlotsStep from "./AlternativeSlotsStep";
import { useBookings } from "./hooks/useBookings";
import { useTimeSlots } from "./hooks/useTimeSlots";

const UserBooking = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    selectedDate: "",
    selectedTime: "",
    selectedOPD: null,
    paymentMethod: null,
    caseDescription: "",
    previousHistory: "",
    currentMeds: "",
    allergies: "",
    fillCaseForm: false, // ✅ Added
  });

  const totalSteps = formData.fillCaseForm ? 6 : 5;

  const [availableOPDs, setAvailableOPDs] = useState([]);
  const [suggestedSlots, setSuggestedSlots] = useState([]);

  const { bookings, addBooking } = useBookings();
  const { generateTimeSlots, findAlternativeSlots } = useTimeSlots(bookings);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle date & time selection
  const handleDateTimeSelect = () => {
    if (!formData.selectedDate || !formData.selectedTime) {
      alert("Please select both date and time");
      return;
    }

    const selectedHour = parseInt(formData.selectedTime.split(":")[0]);
    if (selectedHour < 9 || selectedHour >= 16) {
      alert("Please select a time between 9:00 AM and 4:00 PM");
      return;
    }

    const bookedOPDs = bookings
      .filter(
        (booking) =>
          booking.date === formData.selectedDate &&
          booking.time === formData.selectedTime &&
          booking.status !== "cancelled"
      )
      .map((booking) => booking.opd);

    const allOPDs = [1, 2, 3, 4, 5];
    const available = allOPDs.filter((opd) => !bookedOPDs.includes(opd));

    setAvailableOPDs(available);

    if (available.length === 0) {
      const alternatives = findAlternativeSlots(
        formData.selectedDate,
        formData.selectedTime
      );
      setSuggestedSlots(alternatives);
      setStep(6);
    } else {
      setStep(3);
    }
  };

  // Handle OPD selection
  const handleOPDSelect = (opd) => {
    setFormData((prev) => ({
      ...prev,
      selectedOPD: opd,
    }));
  };

  // Handle payment success
  const handlePaymentSuccess = (paymentMethod) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod,
    }));
    setStep(totalSteps); // Go to confirmation step
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    const newBooking = {
      id: Date.now().toString(),
      name: formData.name,
      phoneNo: formData.phoneNo,
      email: formData.email,
      date: formData.selectedDate,
      time: formData.selectedTime,
      opd: formData.selectedOPD,
      status: "confirmed",
      paymentMethod: formData.paymentMethod,
      amount: 5000,
      bookedAt: new Date().toISOString(),
    };

    addBooking(newBooking);
    alert("Booking confirmed successfully!");

    // Reset form
    setFormData({
      name: "",
      phoneNo: "",
      email: "",
      selectedDate: "",
      selectedTime: "",
      selectedOPD: null,
      paymentMethod: null,
      caseDescription: "",
      previousHistory: "",
      currentMeds: "",
      allergies: "",
      fillCaseForm: false, // ✅ Reset
    });
    setStep(1);
  };

  // Handle alternative slot selection
  const handleAlternativeSelect = (date, time) => {
    setFormData((prev) => ({
      ...prev,
      selectedDate: date,
      selectedTime: time,
    }));

    const bookedOPDs = bookings
      .filter(
        (booking) =>
          booking.date === date &&
          booking.time === time &&
          booking.status !== "cancelled"
      )
      .map((booking) => booking.opd);

    const allOPDs = [1, 2, 3, 4, 5];
    const available = allOPDs.filter((opd) => !bookedOPDs.includes(opd));

    setAvailableOPDs(available);
    setStep(3);
  };

  const renderStep = () => {
    if (formData.fillCaseForm) {
      // ✅ With Case Form
      switch (step) {
        case 1:
          return (
            <PersonalInfoStep
              formData={formData}
              onInputChange={handleInputChange}
              onNext={() => setStep(2)}
            />
          );
        case 2:
          return (
            <DateTimeStep
              formData={formData}
              onInputChange={handleInputChange}
              onBack={() => setStep(1)}
              onDateTimeSelect={handleDateTimeSelect}
              timeSlots={generateTimeSlots()}
            />
          );
        case 3:
          return (
            <OPDSelectionStep
              formData={formData}
              availableOPDs={availableOPDs}
              onOPDSelect={handleOPDSelect}
              onBack={() => setStep(2)}
              onNext={(nextStep) => setStep(nextStep)}
              onInputChange={handleInputChange}
            />
          );
        case 4:
          return (
            <CaseFormStep
              formData={formData}
              onInputChange={handleInputChange}
              onBack={() => setStep(3)}
              onNext={() => setStep(5)}
            />
          );
        case 5:
          return (
            <PaymentStep
              formData={formData}
              onPaymentSuccess={handlePaymentSuccess}
              onBack={() => setStep(4)}
            />
          );
        case 6:
          return (
            <ConfirmationStep
              formData={formData}
              onBack={() => setStep(5)}
              onConfirm={handleConfirmBooking}
            />
          );
        default:
          return null;
      }
    } else {
      // ✅ Without Case Form
      switch (step) {
        case 1:
          return (
            <PersonalInfoStep
              formData={formData}
              onInputChange={handleInputChange}
              onNext={() => setStep(2)}
            />
          );
        case 2:
          return (
            <DateTimeStep
              formData={formData}
              onInputChange={handleInputChange}
              onBack={() => setStep(1)}
              onDateTimeSelect={handleDateTimeSelect}
              timeSlots={generateTimeSlots()}
            />
          );
        case 3:
          return (
            <OPDSelectionStep
              formData={formData}
              availableOPDs={availableOPDs}
              onOPDSelect={handleOPDSelect}
              onBack={() => setStep(2)}
              onNext={(nextStep) => setStep(nextStep)}
              onInputChange={handleInputChange}
            />
          );
        case 4:
          return (
            <PaymentStep
              formData={formData}
              onPaymentSuccess={handlePaymentSuccess}
              onBack={() => setStep(3)}
            />
          );
        case 5:
          return (
            <ConfirmationStep
              formData={formData}
              onBack={() => setStep(4)}
              onConfirm={handleConfirmBooking}
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
        </div>

        <ProgressIndicator currentStep={step} totalSteps={totalSteps} />

        {renderStep()}
      </div>
    </div>
  );
};

export default UserBooking;
