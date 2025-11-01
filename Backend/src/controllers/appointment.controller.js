import mongoose from "mongoose";
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
    fillCaseForm,
    caseForm
  } = req.body;

  // Validation
  if (!name || !phoneNo || !selectedDate || !selectedTime || !selectedOPD) {
    throw new ApiError(400, "Required fields missing: name, phoneNo, selectedDate, selectedTime, selectedOPD");
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

  // Create CaseForm only if fillCaseForm is true and caseForm data is provided
  if (fillCaseForm && caseForm && Object.keys(caseForm).length > 0) {
    try {
      savedCaseForm = await CaseForm.create(caseForm);
    } catch (error) {
      throw new ApiError(400, `Error creating case form: ${error.message}`);
    }
  }

  // Create Appointment
  const appointment = await Appointment.create({
    name,
    phoneNo,
    email,
    selectedDate,
    selectedTime,
    selectedOPD,
    caseDescription,
    fillCaseForm: fillCaseForm || false,
    caseFormId: savedCaseForm?._id || null,
  });

  // Populate the case form data in response
  const populatedAppointment = await Appointment.findById(appointment._id).populate("caseFormId");

  return res
    .status(201)
    .json(new ApiResponse(201, populatedAppointment, "Appointment created successfully"));
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

export const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find().populate("caseFormId").sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, appointments, "All appointments fetched successfully"));
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid appointment ID");
  }

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  ).populate("caseFormId");

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, appointment, "Appointment status updated successfully"));
});

export const getAppointmentsByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;

  if (!date) {
    throw new ApiError(400, "Date is required");
  }

  const appointments = await Appointment.find({
    selectedDate: date,
    status: { $ne: "cancelled" }
  }).populate("caseFormId");

  return res
    .status(200)
    .json(new ApiResponse(200, appointments, `Appointments for ${date} fetched successfully`));
});