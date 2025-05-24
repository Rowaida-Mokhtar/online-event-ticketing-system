import React, { useState } from 'react';
import axios from '../../services/axios'; // Your configured axios instance
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ event }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (quantity < 1 || quantity > event.remainingTickets) {
      setError(`Please select between 1 and ${event.remainingTickets} tickets`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Make API request to your backend
      const response = await axios.post('/bookings', {
  eventId: event._id,
  numberOfTickets: quantity
}, {
  withCredentials: true, // ✅ This sends cookies with the request
  headers: {
    'Content-Type': 'application/json'
  }
});

      // Handle successful booking
      if (response.data && response.data.success) {
        // Redirect with success state
        navigate('/my-bookings', { 
          state: { 
            bookingSuccess: true,
            bookingId: response.data.data.booking._id 
          } 
        });
      } else {
        throw new Error(response.data.message || 'Booking failed');
      }
    } catch (err) {
      console.error('Booking error:', err);
      // Handle different error scenarios
      if (err.response) {
        // The request was made and the server responded with a status code
        if (err.response.status === 401) {
          setError('Please login to book tickets');
        } else if (err.response.status === 400) {
          setError(err.response.data.message || 'Invalid booking request');
        } else if (err.response.status === 404) {
          setError('Event not found');
        } else {
          setError(err.response.data.message || 'Booking failed');
        }
      } else {
        // Something happened in setting up the request
        setError('Network error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h3>Book Tickets</h3>
      
      {event.remainingTickets === 0 ? (
        <div className="alert alert-danger">Sold Out</div>
      ) : event.remainingTickets <= 5 ? (
        <div className="alert alert-warning">
          Only {event.remainingTickets} tickets left!
        </div>
      ) : (
        <div className="ticket-availability">
          {event.remainingTickets} tickets available
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ticketQuantity">Number of Tickets:</label>
          <input
            id="ticketQuantity"
            type="number"
            min="1"
            max={event.remainingTickets}
            value={quantity}
            onChange={(e) => {
              const value = Math.max(1, 
                Math.min(event.remainingTickets, 
                Number(e.target.value) || 1));
              setQuantity(value);
            }}
            className="form-control"
            required
            disabled={event.remainingTickets === 0 || loading}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading || event.remainingTickets === 0}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
              Processing...
            </>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;