// src/pages/Home.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaBars, FaSignOutAlt, FaCalendarAlt } from 'react-icons/fa';
import axios from '../services/axios';
import { AuthContext } from '../context/AuthContext';
import SidebarMenu from '../components/shared/SidebarMenu';
import '../styles/Home.css';

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const Home = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState(null);      // Error state
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(searchTerm);

  useEffect(() => {
    axios.get('/events')
      .then(res => {
        if (res.data.length === 0) {
          setError('There are no upcoming events.');
        } else {
          setEvents(res.data);
          setError(null);
        }
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleLoadMore = () => setVisibleCount(c => c + 5);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch {
      alert('Logout failed');
    }
  };

  return (
    <div className="home-container">
      <div className="top-bar">
        <FaBars className="icon" onClick={() => setShowMenu(!showMenu)} />
        <input
          type="text"
          className="search-input"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaCalendarAlt className="icon" title="View Events" onClick={() => navigate('/events')} />
        {!user ? (
          <FaUser className="icon" title="Login / Signup" onClick={() => navigate('/login')} />
        ) : (
          <FaCog className="icon" title="Settings" onClick={() => setShowSettings(!showSettings)} />
        )}
      </div>

      {showSettings && user && (
        <div className="settings-dropdown">
          <button onClick={() => navigate('/profile')}>View Profile</button>
          <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
        </div>
      )}

      {showMenu && <SidebarMenu role={user?.role} onClose={() => setShowMenu(false)} />}

      <div className="events-grid no-images">
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading events...</p>
        ) : error ? (
          <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.slice(0, visibleCount).map(event => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <div className="event-actions">
                <button onClick={() => navigate(`/events/${event._id}`)}>More Info</button>
                {user?.role?.toLowerCase() === 'user' && event.remainingTickets > 0 && (
                  <button onClick={() => navigate(`/book/${event._id}`)}>Book Now</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No matching events found.</p>
        )}
      </div>

      {visibleCount < filteredEvents.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      )}

      {!user && (
        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '18px' }}>
          Want to join?{' '}
          <span style={{ color: '#ff6f61', cursor: 'pointer' }} onClick={() => navigate('/login')}>
            Login
          </span>{' '}
          or{' '}
          <span style={{ color: '#ff6f61', cursor: 'pointer' }} onClick={() => navigate('/register')}>
            Sign Up
          </span>
        </div>
      )}

    </div>
  );
};

export default Home;