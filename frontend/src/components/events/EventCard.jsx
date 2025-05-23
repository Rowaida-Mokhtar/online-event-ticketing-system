import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/globals.css';

const EventCard = ({ event }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="event-card">
      <div className="event-details">
        <h3>{event.title}</h3>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <div className="buttons">
          <button className="more-info-btn" onClick={() => navigate(`/events/${event._id}`)}>
            More Info
          </button>
          {user?.role?.toLowerCase() === 'user' && event.remainingTickets > 0 && (
            <button className="book-btn" onClick={() => navigate(`/book/${event._id}`)}>
              Book Now
            </button>
          )}
        </div>
      </div>
      <div className="event-image">
        <img
          src={event.image && event.image.trim() !== '' ? event.image : '/placeholder.png'}
          alt={event.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder.png';
          }}
        />
      </div>
    </div>
  );
};

export default EventCard;
