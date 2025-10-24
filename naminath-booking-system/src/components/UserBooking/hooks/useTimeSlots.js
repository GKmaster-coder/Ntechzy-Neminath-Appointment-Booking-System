export const useTimeSlots = (bookings) => {
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 16; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const findAlternativeSlots = (selectedDate, selectedTime) => {
    const alternatives = [];
    const timeSlots = generateTimeSlots();
    const currentIndex = timeSlots.indexOf(selectedTime);
    
    for (let i = 1; i <= 3; i++) {
      if (currentIndex - i >= 0) {
        const prevTime = timeSlots[currentIndex - i];
        const prevBookedOPDs = bookings
          .filter(booking => 
            booking.date === selectedDate && 
            booking.time === prevTime &&
            booking.status !== 'cancelled'
          )
          .map(booking => booking.opd);
        
        if (prevBookedOPDs.length < 5) {
          alternatives.push({
            date: selectedDate,
            time: prevTime,
            availableOPDs: 5 - prevBookedOPDs.length
          });
        }
      }
      
      if (currentIndex + i < timeSlots.length) {
        const nextTime = timeSlots[currentIndex + i];
        const nextBookedOPDs = bookings
          .filter(booking => 
            booking.date === selectedDate && 
            booking.time === nextTime &&
            booking.status !== 'cancelled'
          )
          .map(booking => booking.opd);
        
        if (nextBookedOPDs.length < 5) {
          alternatives.push({
            date: selectedDate,
            time: nextTime,
            availableOPDs: 5 - nextBookedOPDs.length
          });
        }
      }
    }
    
    return alternatives.slice(0, 3);
  };

  return {
    generateTimeSlots,
    findAlternativeSlots,
  };
};