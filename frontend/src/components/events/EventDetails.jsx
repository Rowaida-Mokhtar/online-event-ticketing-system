// src/components/events/EventDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../services/axios';
import BookingForm from '../bookings/BookingForm'; // ✅ Import BookingForm

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [imgSrc, setImgSrc] = useState('/placeholder.png');
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    axios.get(`/events/${id}`)
      .then(res => {
        setEvent(res.data);
        const imageUrl = res.data.image;

        if (imageUrl) {
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => {
            setImgSrc(imageUrl);
            setImgLoading(false);
          };
          img.onerror = () => {
            setImgSrc('/placeholder.png');
            setImgLoading(false);
          };
        } else {
          setImgLoading(false); // No image provided
        }
      })
      .catch(err => {
        console.error('Failed to fetch event:', err);
        setImgLoading(false);
      });
  }, [id]);

  if (!event) return <p style={{ textAlign: 'center' }}>Loading event details...</p>;

  return (
    <div className="event-details-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '30px' }}>
      <h2>{event.title}</h2>

      {/* Show loader while image is being fetched */}
      {imgLoading ? (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          Loading image...
        </div>
      ) : (
        <img
          src={imgSrc}
          alt={event.title}
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: '20px' }}
        />
      )}

      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Price:</strong> ${event.ticketPrice}</p>
      <p><strong>Total Tickets:</strong> {event.totalTickets}</p>
      <p><strong>Remaining Tickets:</strong> {event.remainingTickets}</p>
      <p style={{ marginTop: '20px' }}>{event.description}</p>

      {/* ✅ Add BookingForm here */}
      <BookingForm event={event} />
    </div>
  );
};

export default EventDetails;