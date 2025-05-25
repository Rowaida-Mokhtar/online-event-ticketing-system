// src/components/bookings/BookingForm.jsx
import React, { useState } from 'react';
import axios from '../../services/axios';

const BookingForm = ({ event }) => {
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  // Prevent rendering until event is defined
  if (!event) {
    return <p>Loading event details...</p>;
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');

  try {
    await axios.post('/bookings', {
      eventId: event._id,
      numberOfTickets
    });

    setSuccess('Booking successful!');

    setTimeout(() => {
      setSuccess('');
    }, 3000);
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to book tickets.';
    setError(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <h4>Book Tickets</h4>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Number of Tickets:
          <input
            type="number"
            min="1"
            max={event.remainingTickets}
            value={numberOfTickets}
            onChange={(e) =>
              setNumberOfTickets(Math.max(1, parseInt(e.target.value) || 1))
            }
            style={{ marginLeft: '10px', padding: '5px', width: '60px' }}
            disabled={loading}
          />
        </label>

        <br />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;