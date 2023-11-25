// EventModal.jsx
import React from 'react';

const EventModal = ({ events, selectedDate, onClose }) => {
  return (
    <div className="event-modal-backdrop">
      <div className="event-modal-content">
        <h3>Events on {selectedDate.toDateString()}:</h3>
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event.summary}</li>
          ))}
        </ul>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EventModal;