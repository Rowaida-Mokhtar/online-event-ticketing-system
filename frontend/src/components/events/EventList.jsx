import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';
import EventCard from './EventCard';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/events').then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="event-list">
      <h2>Upcoming Events</h2>
      <div className="event-grid">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
