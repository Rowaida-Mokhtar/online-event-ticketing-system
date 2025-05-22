import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../src/context/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const { user, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;