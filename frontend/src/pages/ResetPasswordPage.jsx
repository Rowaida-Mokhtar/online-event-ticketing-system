// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import axios from '../../src/services/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await axios.post(`/reset-password/${token}`, { newPassword: password });
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      const message = error.response?.data?.message || 'Error resetting password';
      toast.error(message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;