import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String },

    selectedDate: { type: String, required: true },
    selectedTime: { type: String, required: true },
    selectedOPD: { type: Number, required: true },

    caseDescription: { type: String },

    caseFormId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CaseForm",
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
