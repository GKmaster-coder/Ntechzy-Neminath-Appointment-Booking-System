import { useState, useEffect } from 'react';

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = localStorage.getItem('opdBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const addBooking = (newBooking) => {
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('opdBookings', JSON.stringify(updatedBookings));
  };

  return {
    bookings,
    addBooking,
  };
};