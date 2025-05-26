import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';

const EventForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    image: '',
    ticketPrice: 0,
    totalTickets: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/events', formData);
      alert('Event created!');
      navigate('/my-events');
    } catch (err) {
      alert('Failed: ' + (err.response?.data?.message || 'Error'));
    }
  };

  return (
    <div className="event-form-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit} className="event-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} required />
        </div>
        <div>
          <label>Date</label>
          <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Ticket Price</label>
          <input type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} min="0" required />
        </div>
        <div>
          <label>Total Tickets</label>
          <input type="number" name="totalTickets" value={formData.totalTickets} onChange={handleChange} min="1" required />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
