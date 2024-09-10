import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import './AnimatedBackground.css';  // Ensure this line is added to import the animated background styles
import AnimatedBackground from './AnimatedBackground';
import robot from './assets/robot.gif';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending password reset email');
    }
  };

  return (
    <div className="forgot-password-container">
      <AnimatedBackground />
      <div className="forgot-password-content">
        <div className="form-section">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
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

export default ForgotPassword;
