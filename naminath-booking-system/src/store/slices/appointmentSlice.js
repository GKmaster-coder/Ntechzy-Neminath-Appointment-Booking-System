import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { appointmentAPI } from '../../services/api';

// Async thunks
export const createAppointment = createAsyncThunk(
  'appointment/createAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.createAppointment(appointmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAvailability = createAsyncThunk(
  'appointment/checkAvailability',
  async ({ date, time }, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.getAppointmentsByDate(date);
      const bookedAppointments = response.data.filter(
        appointment => appointment.selectedTime === time
      );
      const bookedOPDs = bookedAppointments.map(app => app.selectedOPD);
      const availableOPDs = [1, 2, 3, 4, 5].filter(opd => !bookedOPDs.includes(opd));
      
      return {
        availableOPDs,
        isSlotAvailable: availableOPDs.length > 0
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAppointmentById = createAsyncThunk(
  'appointment/getAppointmentById',
  async (appointmentId, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.getAppointmentById(appointmentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  // Form data
  formData: {
    name: '',
    phoneNo: '',
    email: '',
    selectedDate: '',
    selectedTime: '',
    selectedOPD: null,
    caseDescription: '',
    fillCaseForm: false,
    caseForm: {}
  },
  
  // UI state
  currentStep: 1,
  availableOPDs: [],
  loading: false,
  error: null,
  
  // Appointment data
  appointmentId: null,
  appointmentDetails: null,
  
  // Time slots
  timeSlots: []
};

// Slice
const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    // Form actions
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    
    updateCaseForm: (state, action) => {
      state.formData.caseForm = { ...state.formData.caseForm, ...action.payload };
    },
    
    setFieldValue: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    
    // Navigation actions
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    
    nextStep: (state) => {
      state.currentStep += 1;
    },
    
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    
    // UI actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    setAvailableOPDs: (state, action) => {
      state.availableOPDs = action.payload;
    },
    
    setTimeSlots: (state, action) => {
      state.timeSlots = action.payload;
    },
    
    // Reset actions
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.currentStep = 1;
      state.availableOPDs = [];
      state.error = null;
      state.appointmentId = null;
      state.appointmentDetails = null;
    },
    
    resetError: (state) => {
      state.error = null;
    }
  },
  
  extraReducers: (builder) => {
    builder
      // Create Appointment
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentId = action.payload._id;
        state.appointmentDetails = action.payload;
        state.currentStep = 5; // Move to confirmation step
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Check Availability
      .addCase(checkAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availableOPDs = action.payload.availableOPDs;
        
        if (action.payload.isSlotAvailable) {
          state.currentStep = 3; // Move to OPD selection
        } else {
          state.error = 'No OPDs available for selected time. Please choose another time slot.';
        }
      })
      .addCase(checkAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Appointment by ID
      .addCase(getAppointmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentDetails = action.payload;
      })
      .addCase(getAppointmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const {
  updateFormData,
  updateCaseForm,
  setFieldValue,
  setCurrentStep,
  nextStep,
  prevStep,
  setLoading,
  setError,
  setAvailableOPDs,
  setTimeSlots,
  resetForm,
  resetError
} = appointmentSlice.actions;

// Export selectors
export const selectAppointment = (state) => state.appointment;
export const selectFormData = (state) => state.appointment.formData;
export const selectCurrentStep = (state) => state.appointment.currentStep;
export const selectAvailableOPDs = (state) => state.appointment.availableOPDs;
export const selectLoading = (state) => state.appointment.loading;
export const selectError = (state) => state.appointment.error;
export const selectAppointmentId = (state) => state.appointment.appointmentId;
export const selectAppointmentDetails = (state) => state.appointment.appointmentDetails;
export const selectTimeSlots = (state) => state.appointment.timeSlots;

export default appointmentSlice.reducer;