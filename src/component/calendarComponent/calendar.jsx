import React, { useState} from 'react';
import { useSession} from '@supabase/auth-helpers-react';
import EventModal from './eventModal'

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
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
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const session = useSession();
  const [showModal, setShowModal] = useState(false);

  const fetchEventsForDay = async (date) => {
    const startTime = new Date(date);
    startTime.setHours(0, 0, 0, 0);
    const endTime = new Date(date);
    endTime.setHours(23, 59, 59, 999);

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startTime.toISOString()}&timeMax=${endTime.toISOString()}`, {
      method: "GET",
      headers: { 'Authorization': 'Bearer ' + session.provider_token,}
    });

    if (!response.ok) {
      console.error('Error fetching events');
      return;
    }

    const data = await response.json();
    setEvents(data.items || []);
  };

  const handleDayClick = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    fetchEventsForDay(newDate);
    setShowModal(true);
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
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));
  };

  return (
    
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h2>{monthNames[currentMonth]} {currentYear}</h2>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className="selected-date">
        Selected Date: {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      {showModal && (
        <EventModal
          events={events}
          selectedDate={selectedDate}
          onClose={() => setShowModal(false)}
        />
      )}
      {renderCalendar()}
    </div>
  );
};

export default Calendar;