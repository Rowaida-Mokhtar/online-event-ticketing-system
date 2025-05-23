import React from 'react';
import EventForm from '../components/events/EventForm'; // or wherever it is

const EventFormPage = () => (
  <div>
    <h2>Create or Edit Event</h2>
    <EventForm />
  </div>
);

export default EventFormPage; // ✅ this is critical!
