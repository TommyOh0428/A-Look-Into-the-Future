import React, { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date().getDay());

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const daysCount = daysInMonth(currentMonth, currentYear);

  const handleDayClick = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
  };

  const renderCalendar = () => {
    const days = [];
    for (let row = 0; row < 6; row++) {
      const week = [];
      for (let col = 0; col < 7; col++) {
        const day = row * 7 + col - firstDayOfMonth + 1;
        if (day > 0 && day <= daysCount) {
          week.push(
            <td
              key={day}
              className={`calendar-day ${day === selectedDate.getDate() ? 'selected' : ''}`}
              onClick={() => handleDayClick(day)}
              style={{ userSelect: 'none' }} 
            >
              {day}
            </td>
          );
        } else {
          week.push(<td key={`empty-${col}`} className="empty-day"></td>);
        }
      }
      days.push(<tr key={row}>{week}</tr>);
    }

    return (
      <table className="calendar-grid">
        <thead>
          {/* ... (previous code remains the same) */}
        </thead>
        <tbody>{days}</tbody>
      </table>
    );
  };

  const goToPreviousMonth = () => {
    const newMonth = currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const newFirstDay = new Date(newYear, newMonth, 1).getDay();
  
    setFirstDayOfMonth(newFirstDay);
    setSelectedDate(new Date(newYear, newMonth, selectedDate.getDate()));
  };
  
  const goToNextMonth = () => {
    const newMonth = currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const newFirstDay = new Date(newYear, newMonth, 1).getDay();
  
    setFirstDayOfMonth(newFirstDay);
    setSelectedDate(new Date(newYear, newMonth, selectedDate.getDate()));
  };
  return (
    <div className="calendar-container">
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h2>{monthNames[currentMonth]} {currentYear}</h2>
        <button onClick={goToNextMonth}>&gt;</button>
        
      </div>
      {renderCalendar()}
    </div>
    <div className="selected-date non-clickable" >
        Selected Date: {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
};

export default Calendar;