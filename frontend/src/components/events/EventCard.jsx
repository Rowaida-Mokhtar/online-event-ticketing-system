// src/components/events/EventForm.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/globals.css';

const EventForm = () => {
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate();
  const isEdit = Boolean(id); // Determine if this is an edit form

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    image: '',
    ticketPrice: 0,
    totalTickets: 0,
  });

  // Load event data if editing
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`/events/${id}`)
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => {
          console.error('Error fetching event:', err);
          toast.error('Failed to load event data');
        });
    }
  }, [id]); // ✅ Fixed: Use `id` as dependency instead of `isEdit`

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(`/events/${id}`, formData);
        toast.success('Event updated successfully!');
      } else {
        await axios.post('/events', formData);
        toast.success('Event created successfully!');
      }

      navigate('/my-events');
    } catch (err) {
      console.error('Error saving event:', err);
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} event`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>{isEdit ? 'Edit Event' : 'Create New Event'}</h2>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Ticket Price</label>
        <input
          type="number"
          name="ticketPrice"
          value={formData.ticketPrice}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label>Total Tickets</label>
        <input
          type="number"
          name="totalTickets"
          value={formData.totalTickets}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {isEdit ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;