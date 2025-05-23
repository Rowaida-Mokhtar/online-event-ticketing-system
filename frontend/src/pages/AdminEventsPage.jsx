import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/events') // Assuming /events returns all events for admin
      .then(res => setEvents(res.data))
      .catch(err => console.error('Failed to load events', err));
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`/events/${id}`, { status: 'approved' });
      setEvents(events.map(e => e._id === id ? { ...e, status: 'approved' } : e));
    } catch (err) {
      alert('Approval failed');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>All Events (Admin)</h2>
      {events.map(event => (
        <div key={event._id} style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px' }}>
          <h3>{event.title}</h3>
          <p><strong>Status:</strong> {event.status}</p>
          {event.status !== 'approved' && (
            <button onClick={() => handleApprove(event._id)}>Approve</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminEventsPage;
