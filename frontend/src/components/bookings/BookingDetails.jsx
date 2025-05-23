import React from 'react';
import axios from '../../services/axios';
import { toast } from 'react-toastify';

const BookingDetails = ({ booking }) => {
  const handleCancel = async () => {
    try {
      await axios.delete(`/bookings/${booking._id}`);
      toast.success('Booking canceled');
    } catch {
      toast.error('Failed to cancel');
    }
  };

  return (
    <div className="booking-card">
      <h3>{booking.event?.title}</h3>
      <p>Quantity: {booking.quantity}</p>
      <p>Total Paid: ${booking.totalPrice}</p>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default BookingDetails;
