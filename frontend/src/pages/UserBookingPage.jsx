import React, { useEffect, useState } from 'react';
import axios from '../services/axios';
import { useLocation } from 'react-router-dom';

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/users/bookings');
        
        if (response.data && response.data.success) {
          setBookings(response.data.data || []);
        } else {
          throw new Error(response.data.message || 'Failed to load bookings');
        }
      } catch (err) {
        console.error('Fetch bookings error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();

    // Check for booking success state from navigation
    if (location.state?.bookingSuccess) {
      alert(`Booking successful! Your booking ID: ${location.state.bookingId}`);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const response = await axios.delete(`/bookings/${bookingId}`);

      if (response.data && response.data.success) {
        setBookings(bookings.map(b => 
          b._id === bookingId ? { ...b, status: 'cancelled' } : b
        ));
        alert('Booking cancelled successfully');
      } else {
        throw new Error(response.data.message || 'Cancellation failed');
      }
    } catch (err) {
      console.error('Cancellation error:', err);
      alert(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  if (loading) return <div className="loading-spinner">Loading your bookings...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="alert alert-info">
          You haven't made any bookings yet.
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.event?.title || 'Event not available'}</h3>
                <span className={`status-badge ${booking.status}`}>
                  {booking.status}
                </span>
              </div>
              
              <div className="booking-details">
                <p><strong>Tickets:</strong> {booking.numberOfTickets}</p>
                <p><strong>Total:</strong> ${booking.totalPrice?.toFixed(2)}</p>
                <p><strong>Date:</strong> {booking.event?.date ? 
                  new Date(booking.event.date).toLocaleDateString() : 'N/A'}</p>
              </div>
              
              {booking.status === 'confirmed' && (
                <button 
                  onClick={() => handleCancel(booking._id)}
                  className="cancel-btn"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookingsPage;