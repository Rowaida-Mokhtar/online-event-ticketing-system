import React, { useState } from 'react';
import axios from '../../services/axios';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ event }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/bookings/${event._id}`, { quantity });
      alert('Booking successful!');
      navigate('/bookings');
    } catch (err) {
      alert('Booking failed: ' + (err.response?.data?.message || 'Server error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <label>
        Number of Tickets:
        <input
          type="number"
          min="1"
          max={event.remainingTickets}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ display: 'block', padding: '10px', fontSize: '16px', marginTop: '10px', width: '100%' }}
          required
        />
      </label>
      <p><strong>Total Price:</strong> ${event.ticketPrice * quantity}</p>
      <button
        type="submit"
        disabled={loading}
        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', marginTop: '15px', cursor: 'pointer' }}
      >
        {loading ? 'Processing...' : 'Confirm Booking'}
      </button>
    </form>
  );
};

export default BookingForm;
