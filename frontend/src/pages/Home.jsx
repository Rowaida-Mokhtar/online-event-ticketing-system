import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaBars, FaSignOutAlt, FaCalendarAlt } from 'react-icons/fa';
import axios from '../services/axios';
import { AuthContext } from '../context/AuthContext';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(searchTerm);
  const [counts, setCounts] = useState({});
  const sidebarRef = useRef(null);
  const settingsRef = useRef(null);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Swipe gesture detection
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      goToNext(); // Swipe left → next
    }

    if (touchEndX.current - touchStartX.current > 50) {
      goToPrevious(); // Swipe right → prev
    }
  };

  // Log user for debugging
  useEffect(() => {
    console.log('Current user:', user);
  }, [user]);

  // Effect to detect clicks outside and close menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load events
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

  // Load role-based stats
  useEffect(() => {
    if (!user) return;

    const fetchCounts = async () => {
      try {
        if (user.role.toLowerCase() === 'user') {
          const res = await axios.get('/users/bookings');
          const bookingCount = Array.isArray(res.data) ? res.data.length : 0;
          setCounts(prev => ({ ...prev, bookings: bookingCount }));
        } else if (user.role.toLowerCase() === 'organizer') {
          const res = await axios.get('/users/events');
          const eventCount = Array.isArray(res.data) ? res.data.length : 0;
          setCounts(prev => ({ ...prev, events: eventCount }));
        } else if (user.role.toLowerCase() === 'admin') {
          const [userRes, eventRes] = await Promise.all([
            axios.get('/users'),
            axios.get('/events/all')
          ]);
          const userCount = Array.isArray(userRes.data) ? userRes.data.length : 0;
          const eventCount = Array.isArray(eventRes.data) ? eventRes.data.length : 0;
          setCounts({
            users: userCount,
            events: eventCount
          });
        }
      } catch (err) {
        console.error('Failed to fetch count data:', err);
      }
    };

    fetchCounts();
  }, [user]);

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // Keep current index in bounds when filter changes
  useEffect(() => {
    if (filteredEvents.length > 0 && currentEventIndex >= filteredEvents.length) {
      setCurrentEventIndex(0); // Reset to the first event if out of bounds
    }
  }, [filteredEvents, currentEventIndex]);

  const goToPrevious = () => {
    if (filteredEvents.length > 0) {
      setCurrentEventIndex((prevIndex) => (prevIndex === 0 ? filteredEvents.length - 1 : prevIndex - 1));
    }
  };

  const goToNext = () => {
    if (filteredEvents.length > 0) {
      setCurrentEventIndex((prevIndex) => (prevIndex === filteredEvents.length - 1 ? 0 : prevIndex + 1));
    }
  };

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
        <FaBars
          className="icon"
          onClick={() => {
            setShowMenu(!showMenu);
            setShowSettings(false);
          }}
        />
        <input
          type="text"
          className="search-input"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaCalendarAlt
          className="icon"
          title="View Events"
          onClick={() => navigate('/events')}
        />
        {!user ? (
          <FaUser className="icon" title="Login / Signup" onClick={() => navigate('/login')} />
        ) : (
          <FaCog
            className="icon"
            title="Settings"
            ref={settingsRef}
            onClick={() => {
              setShowSettings(!showSettings);
              setShowMenu(false);
            }}
          />
        )}
      </div>

      {/* Settings Dropdown */}
      {showSettings && user && (
        <div className="settings-dropdown" ref={settingsRef}>
          <button onClick={() => navigate('/profile')}>View Profile</button>
          <button onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}

      {/* Sidebar Menu */}
      {showMenu && (
        <div ref={sidebarRef} className="sidebar-menu">
          {user?.role?.toLowerCase() === 'user' && (
            <>
              <strong>User Menu</strong>
              <div onClick={() => { navigate('/bookings'); setShowMenu(false); }}>
                📄 My Bookings {counts.bookings !== undefined && `(${counts.bookings})`}
              </div>
            </>
          )}

          {user?.role?.toLowerCase() === 'organizer' && (
            <>
              <strong>Organizer Menu</strong>
              <div onClick={() => { navigate('/my-events'); setShowMenu(false); }}>
                📋 My Events {counts.events !== undefined && `(${counts.events})`}
              </div>
              <div onClick={() => { navigate('/my-events/new'); setShowMenu(false); }}>
                ➕ Create Event
              </div>
              <div onClick={() => { navigate('/my-events/analytics'); setShowMenu(false); }}>
                📊 Event Analytics
              </div>
            </>
          )}

          {user?.role?.toLowerCase() === 'admin' && (
            <>
              <strong>Admin Menu</strong>
              <div onClick={() => { navigate('/admin/users'); setShowMenu(false); }}>
                👥 Manage Users {counts.users !== undefined && `(${counts.users})`}
              </div>
              <div onClick={() => { navigate('/admin/events'); setShowMenu(false); }}>
                📁 Manage Events {counts.events !== undefined && `(${counts.events})`}
              </div>
            </>
          )}

          <hr />
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <button
              onClick={() => setShowMenu(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              ← Close
            </button>
          </div>
        </div>
      )}

      {/* Event Grid - One at a Time */}
      {filteredEvents.length > 0 ? (
        <div
          className="events-grid no-images"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow */}
          <button
            className="nav-arrow left"
            onClick={goToPrevious}
            aria-label="Previous Event"
          >
            &#8592;
          </button>

          {/* Single Event Card */}
          <div className="event-list-container">
            <div className="event-card">
              <h3>{filteredEvents[currentEventIndex].title}</h3>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(filteredEvents[currentEventIndex].date).toLocaleDateString()}
              </p>
              <p>{filteredEvents[currentEventIndex].description || 'No description available.'}</p>
              <div className="event-actions">
                <button onClick={() => navigate(`/events/${filteredEvents[currentEventIndex]._id}`)}>
                  More Info
                </button>
                {user?.role?.toLowerCase() === 'user' &&
                  filteredEvents[currentEventIndex].remainingTickets > 0 && (
                    <button onClick={() => navigate(`/book/${filteredEvents[currentEventIndex]._id}`)}>
                      Book Now
                    </button>
                  )}
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            className="nav-arrow right"
            onClick={goToNext}
            aria-label="Next Event"
          >
            &#8594;
          </button>
        </div>
      ) : loading ? (
        <p style={{ textAlign: 'center' }}>Loading events...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      ) : (
        <p style={{ textAlign: 'center' }}>No matching events found.</p>
      )}

      {/* Login Prompt for Guests */}
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