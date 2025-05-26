import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/events/all')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Failed to load events', err));
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`/events/${id}`, { status: 'approved' });
      setEvents(events.map(e => e._id === id ? { ...e, status: 'approved' } : e));
    } catch (err) {
      alert('Approval failed');
      console.error('Approval error:', err);
    }
  };

  const handleDecline = async (id) => {
    if (!window.confirm('Are you sure you want to decline this event?')) return;

    try {
      await axios.put(`/events/${id}`, { status: 'declined' });
      setEvents(events.map(e =>
        e._id === id ? { ...e, status: 'declined' } : e
      ));
    } catch (err) {
      alert('Decline failed');
      console.error('Decline error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axios.delete(`/events/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      alert('Failed to delete event');
      console.error('Delete error:', err);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>All Events (Admin)</h2>

      {events.map(event => (
        <div
          key={event._id}
          style={{
            border: '1px solid #ddd',
            padding: '20px',
            marginBottom: '20px',
            position: 'relative'
          }}
        >
          <h3>{event.title}</h3>
          <p><strong>Status:</strong> {event.status}</p>

          {event.status !== 'approved' && (
            <>
              <button onClick={() => handleApprove(event._id)}>Approve</button>
              <button
                onClick={() => handleDecline(event._id)}
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px'
                }}
              >
                Decline
              </button>
            </>
          )}

          {/* Always show Delete button for admin */}
          <button
            onClick={() => handleDelete(event._id)}
            style={{
              marginLeft: '10px',
              backgroundColor: '#8e44ad',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px'
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminEventsPage;