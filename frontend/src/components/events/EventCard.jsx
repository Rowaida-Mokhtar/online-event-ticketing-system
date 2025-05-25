import React from 'react';

const EventCard = ({ 
  title, 
  date, 
  venue, 
  imageUrl, 
  organizerLogo, 
  status,
  onEdit,
  onDelete // <-- New prop
}) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '300px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      margin: '15px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Event Image */}
      <img src={imageUrl} alt={title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />

      {/* Content */}
      <div style={{ padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3>{title}</h3>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Venue:</strong> {venue}</p>
        <p><strong>Status:</strong> {status}</p>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
          <button
            onClick={onEdit}
            style={{
              flex: 1,
              backgroundColor: '#f39c12',
              color: 'white',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            style={{
              flex: 1,
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;