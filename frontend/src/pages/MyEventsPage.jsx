import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios';
import SidebarMenu from '../components/shared/SidebarMenu'; // ✅ Add this import
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // ✅ Make sure this path is correct

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ Get user for sidebar

  useEffect(() => {
    axios.get('/users/events') // Organizer-specific
      .then(res => setEvents(res.data))
      .catch(err => console.error('Failed to load events', err));
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      {user && <SidebarMenu role={user.role} onClose={() => null} />}

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px', marginLeft: user ? '250px' : '0' }}>
        <h2>My Created Events</h2>
        <button onClick={() => navigate('/my-events/new')}>+ Create New Event</button>

        {events.length === 0 ? (
          <p>No events found. Create one to get started!</p>
        ) : (
          events.map(event => (
            <div key={event._id} style={{ margin: '20px 0', border: '1px solid #ccc', padding: '15px' }}>
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p>Status: {event.status}</p>
              <button onClick={() => navigate(`/my-events/${event._id}/edit`)}>Edit</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyEventsPage;