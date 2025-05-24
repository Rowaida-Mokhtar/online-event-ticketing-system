// src/components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/globals.css';

const LandingPage = () => {
  return (
    <section className="hero-smooth-color">
      <div className="hero-content">
        <h1>Unlock Your Next Adventure</h1>
        <p>
          Discover events that inspire, excite, and connect you with the world.
        </p>
        <Link to="/home">
          <button className="btn-gradient">Get Started</button>
        </Link>
      </div>
    </section>
  );
};

export default LandingPage;