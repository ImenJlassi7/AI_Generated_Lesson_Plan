import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; 
import admin from './assets/admin.png';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/admin-login', { password });
      setMessage(response.data.message);
      if (response.data.token) {
        navigate('/dashboard');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="admin-login-container">
        <div className="admin-login-form">
          <label className="admin_label">Admin Login</label>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="admin-login-input"
            />
            <button type="submit" className="admin-login-button">
              Login
            </button>
          </form>
          {message && <p className="admin-login-error">{message}</p>}
        </div>
        <div className="admin-login-image">
          <img src={admin} alt="admin" className="admin" />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
