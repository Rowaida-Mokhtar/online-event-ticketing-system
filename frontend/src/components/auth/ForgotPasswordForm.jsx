import React, { useState } from 'react';
import axios from '../../services/axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState('request');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/forgetPassword', { email, step: 'request' });
      toast.success('OTP sent to your email');
      setStep('verify');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/forgetPassword', { email, otp, step: 'verify' });
      toast.success('OTP verified');
      setStep('reset');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired OTP');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/forgetPassword', { email, otp, newPassword, step: 'reset' });
      toast.success('Password reset successfully');
      setStep('request');
      setEmail('');
      setOtp('');
      setNewPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="auth-container">
      {step === 'request' && (
        <form onSubmit={handleRequestOtp} className="auth-form">
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      )}

      {step === 'verify' && (
        <form onSubmit={handleVerifyOtp} className="auth-form">
          <h2>Verify OTP</h2>
          <input
            type="text"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      )}

      {step === 'reset' && (
        <form onSubmit={handleResetPassword} className="auth-form">
          <h2>Reset Password</h2>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
