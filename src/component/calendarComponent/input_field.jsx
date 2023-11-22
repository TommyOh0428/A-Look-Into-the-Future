// InputField.jsx
import React, { useState } from 'react';
import { useSession} from '@supabase/auth-helpers-react';

function InputField(props) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const session = useSession();


  
  async function handleAdd() {
    if (!date || !time || !eventName || !eventDescription) {
      alert('Please fill in all of the following fields:\n   Date, Time, Event Name, and Event Description');
      return;
    }
    const dateTime = new Date(`${date}T${time}`);
    const formattedDateTime = dateTime.toISOString();
    // Get the event details from your state or form
    console.log(session.provider_token);
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: formattedDateTime,
        timeZone: 'America/Los_Angeles',  // replace with the user's time zone
      },
      end: {
        dateTime: formattedDateTime,
        timeZone: 'America/Los_Angeles',  // replace with the user's time zone
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

  async function getEventIdByName(eventName) {
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + session.provider_token,  // Access token for Google
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
    }

    const data = await response.json();
    const event = data.items.find(item => item.summary === eventName);

    return event ? event.id : null;
}

  async function deleteEvent(eventId) {
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + session.provider_token,  // Access token for Google
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to delete event: ${response.status}`);
    }
  }

function handleDelete(eventName) {
  const  eventId = getEventIdByName(eventName);
  if (eventId) {
    const confirmation = window.confirm("Are you sure you want to delete this event?");
    if (confirmation) {
      deleteEvent(eventId);
    }
  } else {
    alert("Event not found");
  }
}
  return (
    <div className="event-form-background">
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

      <div className="event-delete-container">
        <div>
          <input
            type="text"
            placeholder="Find Event to Delete"
          />
          <button onClick={() => handleDelete(eventName)}>Delete Event</button>
        </div>
      </div>
    </div>
  );
}

export default InputField;