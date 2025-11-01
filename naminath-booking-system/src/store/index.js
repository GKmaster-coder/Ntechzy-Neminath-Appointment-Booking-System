import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./slices/appointmentSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
