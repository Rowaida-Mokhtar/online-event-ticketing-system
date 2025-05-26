import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/events').then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="event-list" style={{ padding: '20px' }}>
      <h2>Upcoming Events</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {events.map((event) => (
          <li key={event._id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <h3>{event.title}</h3>
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt={event.title}
                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }}
              />
            )}
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Status:</strong> {event.status}</p>
            <p><strong>Description:</strong> {event.description}</p>
            {event.organizerLogo && (
              <img
                src={event.organizerLogo}
                alt="Organizer"
                style={{ height: '40px', marginTop: '10px' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
