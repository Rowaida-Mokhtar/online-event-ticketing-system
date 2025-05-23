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

import ProtectedRoute from './components/shared/ProtectedRoute';

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home user={user} />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
      <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" replace />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      {/* Public Event Detail */}
      <Route path="/events/:id" element={<EventDetailsPage />} />

      {/* Protected Routes */}
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute role="User"><UserBookingPage /></ProtectedRoute>} />

      {/* Organizer Only */}
      <Route path="/my-events" element={<ProtectedRoute role="Organizer"><MyEventsPage /></ProtectedRoute>} />
      <Route path="/my-events/new" element={<ProtectedRoute role="Organizer"><EventFormPage /></ProtectedRoute>} />
      <Route path="/my-events/:id/edit" element={<ProtectedRoute role="Organizer"><EventFormPage /></ProtectedRoute>} />
      <Route path="/my-events/analytics" element={<ProtectedRoute role="Organizer"><EventAnalytics /></ProtectedRoute>} />

      {/* Admin Only */}
      <Route path="/admin/users" element={<ProtectedRoute role="Admin"><AdminUsersPage /></ProtectedRoute>} />
      <Route path="/admin/events" element={<ProtectedRoute role="Admin"><AdminEventsPage /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;