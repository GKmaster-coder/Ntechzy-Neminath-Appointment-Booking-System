// services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'; // Update with your backend URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Appointment API
export const appointmentAPI = {
  createAppointment: (data) => api.post('/appointments', data),
  getAllAppointments: () => api.get('/appointments'),
  getAppointmentById: (id) => api.get(`/appointments/${id}`),
  getAppointmentsByDate: (date) => api.get(`/appointments/date/${date}`),
  updateAppointmentStatus: (id, status) => 
    api.patch(`/appointments/${id}/status`, { status }),
};

export default api;
