import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import BookingDetails from './BookingDetails';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/users/bookings').then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="booking-list">
      {bookings.map((b) => (
        <BookingDetails key={b._id} booking={b} />
      ))}
    </div>
  );
};

export default BookingList;
