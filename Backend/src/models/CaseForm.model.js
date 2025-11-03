import mongoose from "mongoose";

const caseFormSchema = new mongoose.Schema(
  {
    // ✅ Required for 1-to-1 relation with Appointment
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
      sparse: true // ✅ prevents duplicate null key error
    },

    // Basic Information
    currentHeight: String,
    currentWeight: String,
    chiefComplaint: String,

    // Fetal/Birth Information
    maternalHealth: [String],
    maternalIssues: String,
    cSections: String,
    birthType: String,
    birthWeight: String,
    breastFed: String,
    breastFedDuration: String,
    goodBaby: String,
    cryLot: String,

    // Development Milestones
    teethAge: String,
    crawlAge: String,
    walkAge: String,
    talkAge: String,
    milestonesNormal: String,

    // Illness History
    chickenPox: String,
    mumps: String,
    germanMeasles: String,
    pneumonia: String,
    measles: String,
    scarletFever: String,
    mononucleosis: String,
    whoopingCough: String,
    typhoid: String,
    accidentInjury: String,
    dengue: String,
    animalBite: String,
    malaria: String,
    surgicalHistory: String,
    otherIllnesses: String,

    // Recurring Issues
    recurringIssues: [String],

    // Vaccinations
    vaccinationReactions: String,
    healthDeclineVaccination: String,
    allergyDesensitization: String,

    // Family Health History
    familyHistory: [
      {
        relation: String,
        ageAlive: String,
        agePassing: String,
        ailments: String
      }
    ],

    // Significant Life Events
    significantEvents: String,
    ageFramesUnsure: String,

    // Personality & Nature
    childhoodNature: String,
    angerReaction: [String],
    personalityTrait: String,
    pleasantTime: String,
    strugglingTime: String,
    painfulTime: String,
    hobbies: String,
    stressFactor: String,

    // Symptoms & Pain
    painSymptoms: [String],
    symptomBetter: String,
    symptomWorse: String,
    symptomTimeOfDay: String,
    dailySymptoms: String,
    symptomLocation: String,
    symptomExtend: String
  },
  { timestamps: true }
);

export const CaseForm = mongoose.model("CaseForm", caseFormSchema);
