// src/pages/BookingDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/bookings/${id}`)
      .then(res => {
        setBooking(res.data);
        setError(null);
      })
      .catch(err => {
        setError("Failed to load booking details.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading booking details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!booking) return <p>No booking found.</p>;

  return (
    <div style={{ padding: '30px' }}>
      <h2>Booking Details</h2>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '20px',
          padding: '8px 12px',
          background: '#555',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
      >
        ← Back to Bookings
      </button>

      <div style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '600px'
      }}>
        <h3>{booking.event?.title || 'Untitled Event'}</h3>
        <p><strong>Date:</strong> {new Date(booking.event?.date).toLocaleDateString()}</p>
        <p><strong>User:</strong> {booking.user?.name || 'Unknown User'}</p>
        <p><strong>Email:</strong> {booking.user?.email || 'N/A'}</p>
        <p><strong>Tickets:</strong> {booking.numberOfTickets}</p>
        <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
        <p><strong>Status:</strong> {booking.status}</p>
      </div>
    </div>
  );
};

export default BookingDetails;