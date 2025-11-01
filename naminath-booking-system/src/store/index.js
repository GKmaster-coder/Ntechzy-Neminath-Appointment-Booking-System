import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './slices/appointmentSlice';

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['appointment/setLoading', 'appointment/setError'],
        ignoredPaths: ['appointment.loading', 'appointment.error'],
      },
    }),
});

export default store;