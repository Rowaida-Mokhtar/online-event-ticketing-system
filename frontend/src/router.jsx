import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import UserBookingPage from './pages/UserBookingPage';
import MyEventsPage from './pages/MyEventsPage';
import EventFormPage from './pages/EventFormPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminEventsPage from './pages/AdminEventsPage';
//import AnalyticsPage from './pages/AnalyticsPage';

import ProtectedRoute from './components/shared/ProtectedRoute';
import EventAnalytics from './components/events/EventAnalytics';

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/login" />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/book/:id" element={<ProtectedRoute role="User"><UserBookingPage /></ProtectedRoute>} />
      <Route path="/events/:id" element={<EventDetailsPage />} />

      {/* Organizer-only routes */}
      <Route path="/my-events" element={<ProtectedRoute role="Organizer"><MyEventsPage /></ProtectedRoute>} />
      <Route path="/my-events/new" element={<ProtectedRoute role="Organizer"><EventFormPage /></ProtectedRoute>} />
      <Route path="/my-events/:id/edit" element={<ProtectedRoute role="Organizer"><EventFormPage /></ProtectedRoute>} />
      <Route path="/my-events/analytics" element={<ProtectedRoute role="Organizer"><EventAnalytics /></ProtectedRoute>} />

      {/* Admin-only routes */}
<Route path="/admin/users" element={<ProtectedRoute role="Admin"><AdminUsersPage /></ProtectedRoute>} />
      <Route path="/admin/events" element={<ProtectedRoute role="Admin"><AdminEventsPage /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
