// slices/appointmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { appointmentAPI } from '../../services/api';

// Async thunks
export const createAppointment = createAsyncThunk(
  'appointment/createAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.createAppointment(appointmentData);
      // Extract data from response
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const checkAvailability = createAsyncThunk(
  'appointment/checkAvailability',
  async ({ date, time }, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.getAppointmentsByDate(date);
      // Extract data array from response
      const appointments = response.data.data || response.data;
      const bookedAppointments = appointments.filter(
        appointment => appointment.selectedTime === time
      );
      const bookedOPDs = bookedAppointments.map(app => app.selectedOPD);
      const availableOPDs = [1, 2, 3, 4, 5].filter(opd => !bookedOPDs.includes(opd));
      
      return {
        availableOPDs,
        isSlotAvailable: availableOPDs.length > 0
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAppointmentById = createAsyncThunk(
  'appointment/getAppointmentById',
  async (appointmentId, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.getAppointmentById(appointmentId);
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Admin thunks
export const getAllAppointments = createAsyncThunk(
  'appointment/getAllAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.getAllAppointments();
      // Extract the data array from the response
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAppointmentsByDate = createAsyncThunk(
  'appointment/getAppointmentsByDate',
  async (date, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.getAppointmentsByDate(date);
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  'appointment/updateAppointmentStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.updateAppointmentStatus(id, status);
      return response.data.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
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
  timeSlots: [],
  
  // Admin data
  allAppointments: [],
  appointmentsByDate: [],
  adminLoading: false,
  adminError: null
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
    
    // Admin actions
    setAllAppointments: (state, action) => {
      state.allAppointments = action.payload;
    },
    
    setAdminLoading: (state, action) => {
      state.adminLoading = action.payload;
    },
    
    setAdminError: (state, action) => {
      state.adminError = action.payload;
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
    },
    
    resetAdminState: (state) => {
      state.allAppointments = [];
      state.appointmentsByDate = [];
      state.adminLoading = false;
      state.adminError = null;
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
      })
      
      // Get All Appointments (Admin)
      .addCase(getAllAppointments.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.adminLoading = false;
        // Ensure we're setting an array
        state.allAppointments = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload || 'Failed to fetch appointments';
        state.allAppointments = []; // Set empty array on error
      })
      
      // Get Appointments by Date
      .addCase(getAppointmentsByDate.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(getAppointmentsByDate.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.appointmentsByDate = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAppointmentsByDate.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload || 'Failed to fetch appointments by date';
        state.appointmentsByDate = [];
      })
      
      // Update Appointment Status
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.adminLoading = false;
        // Update the appointment in allAppointments
        const updatedAppointment = action.payload;
        const index = state.allAppointments.findIndex(apt => apt._id === updatedAppointment._id);
        if (index !== -1) {
          state.allAppointments[index] = updatedAppointment;
        }
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload || 'Failed to update appointment status';
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
  setAllAppointments,
  setAdminLoading,
  setAdminError,
  resetForm,
  resetError,
  resetAdminState
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

// Admin selectors
export const selectAllAppointments = (state) => state.appointment?.allAppointments || [];
export const selectAppointmentsByDate = (state) => state.appointment?.appointmentsByDate || [];
export const selectAdminLoading = (state) => state.appointment?.adminLoading || false;
export const selectAdminError = (state) => state.appointment?.adminError || null;

export default appointmentSlice.reducer;
