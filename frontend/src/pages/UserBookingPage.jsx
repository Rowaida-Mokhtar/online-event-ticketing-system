import React, { useEffect, useState, useContext } from 'react';
import axios from '../services/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    axios.get('/users/bookings')
      .then(res => {
        console.log('API Response:', res.data); // Debug the response
        // Ensure res.data is an array, default to empty array if not
        setBookings(Array.isArray(res.data) ? res.data : []);
        setError(null);
      })
      .catch(err => {
        setError("Failed to load bookings.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await axios.delete(`/bookings/${bookingId}`);
      setBookings(prev => prev.map(b =>
        b._id === bookingId ? { ...b, status: 'canceled' } : b
      ));
    } catch (err) {
      alert('Failed to cancel booking');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>My Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        bookings.map(booking => (
          <div
            key={booking._id}
            style={{
              border: '1px solid #ccc',
              padding: '20px',
              marginBottom: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              opacity: booking.status === 'canceled' ? 0.7 : 1,
              position: 'relative'
            }}
          >
            {/* Canceled Badge */}
            {booking.status === 'canceled' && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                Canceled
              </div>
            )}

            <h3>{booking.event?.title || 'Untitled Event'}</h3>
            <p><strong>Date:</strong> {new Date(booking.event?.date).toLocaleDateString()}</p>
            <p><strong>Tickets:</strong> {booking.numberOfTickets}</p>
            <p><strong>Total Price:</strong> ${booking.totalPrice}</p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleCancel(booking._id)}
                disabled={booking.status === 'canceled'}
                style={{
                  color: 'white',
                  backgroundColor: booking.status === 'canceled' ? '#aaa' : '#e74c3c',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: booking.status === 'canceled' ? 'not-allowed' : 'pointer',
                  borderRadius: '4px'
                }}
              >
                {booking.status === 'canceled' ? 'Canceled' : 'Cancel Booking'}
              </button>

              <button
                onClick={() => navigate(`/bookings/${booking._id}`)}
                style={{
                  color: 'white',
                  backgroundColor: '#3498db',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                View Booking
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserBookingsPage;