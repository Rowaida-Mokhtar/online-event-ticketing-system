import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/axios';

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '', description: '', date: '', location: '',
    category: '', image: '', ticketPrice: 0, totalTickets: 0
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`/events/${id}`).then(res => {
        setFormData(res.data);
      }).catch(console.error);
    }
  }, [id, isEdit]); // ✅ Fixed: Added 'isEdit' to dependency array

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`/events/${id}`, formData);
        alert('Event updated!');
      } else {
        await axios.post('/events', formData);
        alert('Event created!');
      }
      navigate('/my-events');
    } catch (err) {
      alert('Failed: ' + (err.response?.data?.message || 'Error'));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
      {['title', 'description', 'location', 'category', 'image'].map((field) => (
        <div key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input type="text" name={field} value={formData[field]} onChange={handleChange} required />
        </div>
      ))}
      <label>Date</label>
      <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
      <label>Ticket Price</label>
      <input type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} min="0" required />
      <label>Total Tickets</label>
      <input type="number" name="totalTickets" value={formData.totalTickets} onChange={handleChange} min="1" required />

      <button type="submit">{isEdit ? 'Update' : 'Create'} Event</button>
    </form>
  );
};

export default EventForm;