import React, { useState, useEffect } from 'react';
import axios from '../../src/services/axios';
import EventCard from '../../src/components/events/EventCard';
import Loader from '../../src/shared/Loader';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import ToastNotification from '../shared/ToastNotification';

//import styles from '../styles/Home.css';
const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch approved events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/events/approved');
        setEvents(res.data);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle booking
  const handleBookEvent = async (eventId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('/bookings', { eventId });
      ToastNotification.showSuccess('Booking successful!');
    } catch (err) {
      ToastNotification.showError(
        err.response?.data?.message || 'Booking failed. Please try again.'
      );
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    document.querySelector('.event-slider').scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    document.querySelector('.event-slider').scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Filter events by search term
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <Navbar />

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>

        <div className="user-icons">
          <i
            className="fas fa-user"
            title="Login / Profile"
            onClick={() => navigate(user ? '/profile' : '/login')}
          ></i>
          {user && (
            <i
              className="fas fa-edit"
              title="Update Profile"
              onClick={() => navigate('/profile/edit')}
            ></i>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="hero-title">Welcome to Your Online Event Ticketing System</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="event-section">
            <h2 className="section-title">Approved Events</h2>

            <div className="slider-container">
              <i className="fas fa-arrow-left arrow" onClick={scrollLeft}></i>

              <div className="event-slider">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventCard
                      key={event._id || event.id}
                      event={event}
                      onBook={user ? () => handleBookEvent(event._id || event.id) : undefined}
                    />
                  ))
                ) : (
                  <p>No events found matching your search.</p>
                )}
              </div>

              <i className="fas fa-arrow-right arrow" onClick={scrollRight}></i>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastNotification />
    </div>
  );
};

export default Home;