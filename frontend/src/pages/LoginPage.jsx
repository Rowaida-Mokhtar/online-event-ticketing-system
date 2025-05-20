// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/auth/LoginForm';

function LoginPage() {
  const handleLoginSuccess = (userData) => {
    console.log('Login successful:', userData);
    window.location.href = '/'; // Redirect to home after login
  };

  return (
    <div className="login-page">
      <h1>Welcome Back!</h1>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default LoginPage;