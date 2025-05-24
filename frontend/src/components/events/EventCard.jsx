// src/components/events/EventCard.jsx
import React from 'react';
import '../../styles/event-card.css';

const EventCard = ({ title, date, venue, imageUrl, organizerLogo, status, onEdit }) => {
  return (
    <div className="event-card">
      {/* Left Section - Text */}
      <div className="event-info">
        <h3 className="event-title">{title}</h3>
        <p className="event-date">Date: {date}</p>
        <p className="event-location">Location: {venue}</p>

        {/* Organizer Logo */}
        <div className="organizer-logo">
          <img src={organizerLogo} alt="Organizer" width="80" />
        </div>

        {/* Status Badge */}
        <div className={`status-badge ${status?.toLowerCase()}`}>
          {status || 'Pending'}
        </div>

        {/* Action Button */}
        <button className="edit-button" onClick={onEdit}>
          Edit
        </button>
      </div>

      {/* Right Section - Image */}
      <div className="event-image">
        <img src={imageUrl} alt={title} />
      </div>
    </div>
  );
};

export default EventCard;