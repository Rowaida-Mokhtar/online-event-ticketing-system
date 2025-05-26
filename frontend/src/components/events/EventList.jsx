import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Use the navigate hook

  useEffect(() => {
    axios.get('/events').then((res) => setEvents(res.data));
  }, []);

  const handleMoreInfo = (eventId) => {
    navigate(`/events/${eventId}`); // Navigate to event details
  };

  const handleBookNow = (eventId) => {
    navigate(`/book/${eventId}`); // Navigate to book event
  };

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
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            position: 'relative', // Add position relative to the event item
            display: 'flex', // Use flexbox layout
            flexDirection: 'column', // Stack children vertically
            justifyContent: 'space-between' // Space out the buttons from other content
          }}>
            <div>
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
            </div>
            <div style={{ marginTop: '10px', textAlign: 'right' }}> {/* Align buttons to the right */}
              <button
                onClick={() => handleMoreInfo(event._id)}
                style={{
                  backgroundColor: '#FFC0CB', // Baby pink background
                  color: '#fff', // White text
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 15px',
                  margin: '5px 0',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#FFB6C1' } // Darken on hover
                }}
              >
                More Info
              </button>
              <button
                onClick={() => handleBookNow(event._id)}
                style={{
                  backgroundColor: '#FFC0CB', // Baby pink background
                  color: '#fff', // White text
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 15px',
                  margin: '5px 0',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#FFB6C1' } // Darken on hover
                }}
              >
                Book Now
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;