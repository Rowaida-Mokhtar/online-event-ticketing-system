import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage'; // new
import ProfilePage from './pages/ProfilePage';
import UserBookingPage from './pages/UserBookingPage';
import MyEventsPage from './pages/MyEventsPage';
import EventFormPage from './pages/EventFormPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminEventsPage from './pages/AdminEventsPage';
import EventAnalytics from './components/events/EventAnalytics';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/shared/ProtectedRoute';
import BookingDetails from './components/bookings/BookingDetails';
import EventDetails from './components/events/EventDetails';
import EventList from './components/events/EventList';

const AppRouter = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading application...</div>;
  }

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
      <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" replace />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/events" element={<EventList />} />


      {/* Public Event Detail */}
      <Route path="/events/:id" element={<EventDetailsPage />} />

      {/* Protected Routes */}
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute role="user"><UserBookingPage /></ProtectedRoute>} />
      <Route path="/bookings/:id" element={<ProtectedRoute role="user"><BookingDetails /></ProtectedRoute>} />
      <Route path="/book/:id" element={<ProtectedRoute role="user"><EventDetails /></ProtectedRoute>} />


      {/* Organizer Only */}
      <Route path="/my-events" element={<ProtectedRoute role="organizer"><MyEventsPage /></ProtectedRoute>} />
      <Route path="/my-events/new" element={<ProtectedRoute role="organizer"><EventFormPage /></ProtectedRoute>} />
      <Route path="/my-events/:id/edit" element={<ProtectedRoute role="organizer"><EventFormPage /></ProtectedRoute>} />
      <Route path="/my-events/analytics" element={<ProtectedRoute role="organizer"><EventAnalytics /></ProtectedRoute>} />

      {/* Admin Only */}
      <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsersPage /></ProtectedRoute>} />
      <Route path="/admin/events" element={<ProtectedRoute role="admin"><AdminEventsPage /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;