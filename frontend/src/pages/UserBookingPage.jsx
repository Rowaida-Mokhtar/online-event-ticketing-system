import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const UserBookingPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/users/bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error('Failed to load bookings:', err));
  }, []);

  return (
    <div className="page-container" style={{ padding: '40px' }}>
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((b, i) => (
            <li key={i} style={{ marginBottom: '20px' }}>
              <strong>{b.event?.title || 'Untitled Event'}</strong><br />
              Tickets: {b.numberOfTickets}<br />
              Total Paid: ${b.totalPrice}<br />
              Date: {new Date(b.createdAt).toLocaleString()}<br />
              Status: {b.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven’t booked any tickets yet.</p>
      )}
    </div>
  );
};

export default UserBookingPage;
