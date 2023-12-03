// InputField.jsx
import React, { useState } from 'react';
import { useSession} from '@supabase/auth-helpers-react';
import './calendar.css'

function InputField(props) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const session = useSession();
  const [endTime, setEndTime] = useState("");
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  async function handleAdd() {
    if (!date || !time || !eventName || !eventDescription) {
      alert('Please fill in all of the following fields:\n   Date, Time, Event Name, and Event Description');
      return;
    }
    const dateTime = new Date(`${date}T${time}`);
    const endDateTime = new Date(`${date}T${endTime}`);
    const formattedDateTime = dateTime.toISOString();
    const formattedEndDateTime = endDateTime.toISOString();
    // Get the event details from your state or form
    console.log(session.provider_token);
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: formattedDateTime,
        timeZone: timeZone,  // replace with the user's time zone
      },
      end: {
        dateTime: formattedEndDateTime,
        timeZone: timeZone,  // replace with the user's time zone
      },
    };
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Authorization':'Bearer ' + session.provider_token  // Access token for google
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      alert("Event created, check your Google Calendar!");
    });
  }


  function handleCancel(){
    setEventName('');
    setEventDescription('');
  }

  return (
    //<div className="event-form-background">
      <div className="event-form-container">
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <span>Until</span>
          <input
            type="time"
            value={endTime} // Use the new state variable here
            onChange={(e) => setEndTime(e.target.value)} // And here
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
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
      //</div>
  );
}

export default InputField;
