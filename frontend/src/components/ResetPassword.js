import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import './ResetPassword.css';
import './AnimatedBackground.css';  // Ensure this line is added to import the animated background styles
import AnimatedBackground from './AnimatedBackground';
import robot from './assets/robot.gif';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirming password
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/auth/reset-password', { email, newPassword });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="reset-password-container">
      <AnimatedBackground />
      <div className="reset-password-content">
        <div className="form-section">
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
          {message && <p>{message}</p>}
        </div>
        <div className="image-section">
          <img src={robot} alt="robot" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
