import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import '../../styles/login.css';
 
const LoginForm = () => {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logged in successfully');
    } catch (err) {
      toast.error('Failed to login');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="login-button">Login</button>
        <div className="options">
          <button type="button" onClick={() => navigate('/register')} className="create-account-button">Create Account</button>
          <button type="button" className="forgot-password-button" onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;