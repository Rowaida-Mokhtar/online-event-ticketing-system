import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEdit } from 'react-icons/fa';
import axios from '../services/axios';

const Home = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/events'); 
        setEvents(res.data || []);
      } catch (err) {
        setError('Failed to fetch events');
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // You could add actual search filtering here
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Welcome to Your Online Event Ticketing System</h1>
        <p>Explore, Book, and Enjoy Live Events</p>
      </div>

      <div
        className="search-and-icons"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            style={{ background: 'tomato', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
          >
            🔍
          </button>
        </div>

        <div
          className="user-icons"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <FaUser
            size={24}
            title="Login / Profile"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(user ? '/profile' : '/login')}
          />
          {user && (
            <FaEdit
              size={24}
              title="Edit Profile"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/profile/edit')}
            />
          )}
        </div>
      </div>

      <div className="events-section">
        <h2>Approved Events</h2>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          
          <div className="event-cards" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {events.map((event) => (
              <div
                key={event._id}
                className="event-card"
                style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}
              >
                {/* Render image if available */}
                <img
                
                  src={event.image || '/placeholder.png'} // Fallback image
                  alt={event.title || event.name}
                  style={{
                    width: '100%',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    marginBottom: '1rem',
                  }}
                />
                <h3>{event.title || event.name}</h3>
                <p>{event.description}</p>
                <button onClick={() => navigate(`/events/${event._id}`)}>View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {!user && (
        <div className="login-prompt" style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>
            <span
              onClick={() => navigate('/login')}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              Login / Signup
            </span>{' '}
            to book your favorite events!
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
