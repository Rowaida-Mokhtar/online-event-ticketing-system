import React, { useEffect, useState, useContext } from 'react';
import axios from '../services/axios';
import { AuthContext } from '../context/AuthContext';

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    axios.get('/users/bookings')
      .then(res => {
        setBookings(res.data);
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
      setBookings(prev => prev.filter(b => b._id !== bookingId));
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
          <div key={booking._id} style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
            <h3>{booking.event?.title || 'Untitled Event'}</h3>
            <p><strong>Date:</strong> {new Date(booking.event?.date).toLocaleDateString()}</p>
            <p><strong>Tickets:</strong> {booking.numberOfTickets}</p>
            <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
            <button onClick={() => handleCancel(booking._id)} style={{ color: 'white', backgroundColor: '#e74c3c', border: 'none', padding: '8px 12px', cursor: 'pointer' }}>
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default UserBookingsPage;
