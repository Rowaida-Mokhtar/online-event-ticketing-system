// MyEventsPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from '../services/axios';
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/events/EventCard';

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
  axios.get('/users/events')
    .then(res => {
      // ✅ Ensure res.data is an array before setting state
      const data = Array.isArray(res.data) ? res.data : [];
      setEvents(data);
      setLoading(false);
    })
    .catch(err => {
      setError("Failed to load your events.");
      console.error('Failed to load events', err);
      setLoading(false);
    });
}, []);
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axios.delete(`/events/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      alert('Failed to delete event');
      console.error('Error deleting event:', err);
    }
  };

  if (!user || user.role.toLowerCase() !== 'organizer') {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="home-container" style={{ padding: '30px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Created Events</h2>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button
          onClick={() => navigate('/my-events/new')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ➕ Create New Event
        </button>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading events...</p>
      ) : events.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No events found. Create one to get started!</p>
      ) : (
        <div className="events-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {events.map(event => (
            <EventCard
              key={event._id}
              title={event.title}
              date={new Date(event.date).toLocaleDateString()}
              venue={event.location}
              imageUrl={event.image || '/images/event-default.jpg'}
              organizerLogo={event.organizerLogo || '/images/logo-default.jpg'}
              status={event.status}
              onEdit={() => navigate(`/my-events/${event._id}/edit`)}
              onDelete={() => handleDelete(event._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;