// src/pages/Bookings/BookingList.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import BookingDetails from './BookingDetails';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/users/bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error('Failed to load bookings:', err));
  }, []);

  return (
    <div className="booking-list">
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b) => (
          <BookingDetails key={b._id} booking={b} />
        ))
      )}
    </div>
  );
};

export default BookingList;