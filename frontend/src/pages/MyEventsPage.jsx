import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from '../services/axios';
import { AuthContext } from '../context/AuthContext';

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get('/users/events')
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load your events.");
        console.error('Failed to load events', err);
        setLoading(false);
      });
  }, []);

  if (!user || user.role.toLowerCase() !== 'organizer') {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="home-container" style={{ padding: '30px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Created Events</h2>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button onClick={() => navigate('/my-events/new')} style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          ➕ Create New Event
        </button>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading events...</p>
      ) : events.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No events found. Create one to get started!</p>
      ) : (
        <div className="events-grid no-images">
          {events.map(event => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {event.status}</p>
              <div className="event-actions">
                <button onClick={() => navigate(`/my-events/${event._id}/edit`)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;
