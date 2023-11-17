// InputField.jsx
import React, { useState } from 'react';

function InputField() {
  const [dateTime, setDateTime] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  function handleAdd() {
    // Get the event details from your state or form

    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: dateTime.toISOString(),
        timeZone: 'America/Los_Angeles',  // replace with the user's time zone
      },
      end: {
        dateTime: dateTime.toISOString(),
        timeZone: 'America/Los_Angeles',  // replace with the user's time zone
      },
    };
  
    // Load the Google Calendar API client library
    window.gapi.load('client', () => {
      window.gapi.client.load('calendar', 'v3', () => {
        // Insert the event into the primary calendar
        window.gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: event,
        }).then(response => {
          console.log('Event created: ' + response.result.htmlLink);
        }).catch(error => {
          console.log('Error: ' + error.message);
        });
      });
    });
  }

  return (
    <div>
      <input
        type="datetime-local"
        value={dateTime instanceof Date && !isNaN(dateTime) ? dateTime.toISOString().substring(0, 16) : ""}
        onChange={(e) => {
          const newDate = new Date(e.target.value);
        if (newDate instanceof Date && !isNaN(newDate)) {
      setDateTime(newDate);}
        }}
      />
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Event Description"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default InputField;