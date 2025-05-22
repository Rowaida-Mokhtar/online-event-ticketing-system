import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
// import UpdateProfileForm from './pages/UpdateProfileForm'; // 🔁 Temporarily commented
// import EventAnalyticsPage from './pages/EventAnalyticsPage'; // 🔁 Temporarily commented
import EventDetailsPage from './pages/EventDetailsPage';
import UserBookingsPage from './pages/UserBookingsPage';
import MyEventsPage from './pages/MyEventsPage';
import EventFormPage from './pages/EventFormPage';
import AdminEventsPage from './pages/AdminEventsPage';
// import AdminUsersPage from './pages/AdminUsersPage'; // 🔁 Temporarily commented

// Protected Route Wrapper
import ProtectedRoute from './shared/ProtectedRoute';

function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* User Routes - Standard User */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={['Standard User', 'Event Organizer', 'Admin']}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      {/* 
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute allowedRoles={['Standard User', 'Event Organizer', 'Admin']}>
            <UpdateProfileForm />
          </ProtectedRoute>
        }
      /> 
      */}

      <Route
        path="/bookings"
        element={
          <ProtectedRoute allowedRoles={['Standard User']}>
            <UserBookingsPage />
          </ProtectedRoute>
        }
      />

      {/* Event Organizer Routes */}
      <Route
        path="/my-events"
        element={
          <ProtectedRoute allowedRoles={['Event Organizer']}>
            <MyEventsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-events/new"
        element={
          <ProtectedRoute allowedRoles={['Event Organizer']}>
            <EventFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-events/:id/edit"
        element={
          <ProtectedRoute allowedRoles={['Event Organizer']}>
            <EventFormPage />
          </ProtectedRoute>
        }
      />
      {/* 
      <Route
        path="/my-events/analytics"
        element={
          <ProtectedRoute allowedRoles={['Event Organizer']}>
            <EventAnalyticsPage />
          </ProtectedRoute>
        }
      /> 
      */}

      {/* Admin Routes */}
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminEventsPage />
          </ProtectedRoute>
        }
      />
      {/* 
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminUsersPage />
          </ProtectedRoute>
        }
      /> 
      */}

      {/* Event Details (Public) */}
      <Route path="/events/:id" element={<EventDetailsPage />} />

      {/* 404 - Not Found */}
      <Route
        path="*"
        element={<div className="text-center mt-10 text-red-500">404 - Page Not Found</div>}
      />
    </Routes>
  );
}

export default AppRouter;