import mongoose from "mongoose";

const caseFormSchema = new mongoose.Schema(
  {
    painLevel: String,
    symptoms: [String],
    duration: String,
    allergies: [String],
    medications: String
  },
  { timestamps: true }
);

export const CaseForm = mongoose.model("CaseForm", caseFormSchema);
