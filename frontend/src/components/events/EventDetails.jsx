import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../services/axios';
import { AuthContext } from '../../context/AuthContext';
import BookingForm from '../bookings/BookingForm';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error('Failed to fetch event:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading event details...</p>;
  if (!event) return <p style={{ textAlign: 'center' }}>Event not found.</p>;

  return (
    <div className="event-details-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '30px' }}>
      <h2>{event.title}</h2>
      <img
        src={event.image || '/placeholder.png'}
        alt={event.title}
        style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: '20px' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/placeholder.png';
        }}
      />
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Price:</strong> ${event.ticketPrice}</p>
      <p><strong>Total Tickets:</strong> {event.totalTickets}</p>
      <p><strong>Remaining Tickets:</strong> {event.remainingTickets}</p>
      <p style={{ marginTop: '20px' }}>{event.description}</p>

      {user?.role?.toLowerCase() === 'user' && event.remainingTickets > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h4>Ready to reserve your ticket?</h4>
          <BookingForm event={event} />
        </div>
      )}

      {user?.role?.toLowerCase() === 'user' && event.remainingTickets === 0 && (
        <p style={{ marginTop: '20px', color: 'red' }}><strong>Sold Out:</strong> No tickets remaining.</p>
      )}
    </div>
  );
};

export default EventDetails;
