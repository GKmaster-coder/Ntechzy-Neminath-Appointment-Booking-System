import mongoose from "mongoose"
import { Appointment } from "../models/Appointment.model.js";
import { CaseForm } from "../models/CaseForm.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createAppointment = asyncHandler(async (req, res) => {
  const {
    name,
    phoneNo,
    email,
    selectedDate,
    selectedTime,
    selectedOPD,
    caseDescription,
    caseForm,
  } = req.body;

  if (!name || !phoneNo || !selectedDate || !selectedTime || !selectedOPD) {
    throw new ApiError(400, "Required fields missing");
  }

  // Slot validation: max 5 bookings per time slot
  const existingCount = await Appointment.countDocuments({
    selectedDate,
    selectedTime,
    status: { $ne: "cancelled" },
  });

  if (existingCount >= 5) {
    throw new ApiError(400, "This slot is full. Please select another time.");
  }

  let savedCaseForm = null;

  if (caseForm && Object.keys(caseForm).length > 0) {
    savedCaseForm = await CaseForm.create(caseForm);
  }

  const appointment = await Appointment.create({
    name,
    phoneNo,
    email,
    selectedDate,
    selectedTime,
    selectedOPD,
    caseDescription,
    caseFormId: savedCaseForm?._id || null,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, appointment, "Appointment created successfully"));
});


export const getAppointmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid appointment ID");
  }

  const appointment = await Appointment.findById(id).populate("caseFormId");

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, appointment, "Appointment fetched successfully"));
});