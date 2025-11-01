import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received from: ${response.config.url}`, response.data);
    return response.data;
  },
  (error) => {
    console.error('❌ Response interceptor error:', error);
    
    // Enhanced error handling
    let message = 'Something went wrong';
    
    if (error.code === 'ECONNABORTED') {
      message = 'Request timeout. Please try again.';
    } else if (error.response) {
      // Server responded with error status
      message = error.response?.data?.message || error.response?.statusText || 'Server error';
    } else if (error.request) {
      // Request made but no response received
      message = 'No response from server. Please check your connection.';
    } else {
      // Something else happened
      message = error.message || 'Network error';
    }
    
    return Promise.reject(new Error(message));
  }
);

export const appointmentAPI = {
  // Create new appointment
  createAppointment: async (appointmentData) => {
    try {
      const response = await api.post('/appointments', appointmentData);
      return response;
    } catch (error) {
      console.error('Create appointment error:', error);
      throw error;
    }
  },

  // Get all appointments
  getAllAppointments: async () => {
    try {
      const response = await api.get('/appointments');
      return response;
    } catch (error) {
      console.error('Get all appointments error:', error);
      throw error;
    }
  },

  // Get appointment by ID
  getAppointmentById: async (id) => {
    try {
      const response = await api.get(`/appointments/${id}`);
      return response;
    } catch (error) {
      console.error('Get appointment by ID error:', error);
      throw error;
    }
  },

  // Get appointments by date
  getAppointmentsByDate: async (date) => {
    try {
      const response = await api.get(`/appointments/date/${date}`);
      return response;
    } catch (error) {
      console.error('Get appointments by date error:', error);
      throw error;
    }
  },

  // Update appointment status
  updateAppointmentStatus: async (id, status) => {
    try {
      const response = await api.patch(`/appointments/${id}/status`, { status });
      return response;
    } catch (error) {
      console.error('Update appointment status error:', error);
      throw error;
    }
  },
};

export default api;