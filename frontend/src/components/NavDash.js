import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavDash.css';
import axios from 'axios';

const NavDash = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await axios.post('http://localhost:5000/admin/signout', {}, { withCredentials: true });
      console.log('SignOut Response:', response.data);
      navigate('/first');
    } catch (error) {
      console.error('Error signing out:', error);
      console.error('Error Response:', error.response);
    }
  };

  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand ps-3" href="#!">Admin Dashboard</a>
        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#!">Settings</a></li>
              <li><a className="dropdown-item" href="#!">Activity Log</a></li>
              <li><hr className="dropdown-divider" /></li>
              {/* Change this line to trigger handleSignOut */}
              <li><span className="dropdown-item" onClick={handleSignOut} style={{ cursor: 'pointer' }}>Logout</span></li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to='/adminFeedback'>Feedbacks</Link></li>
          <li><Link to="/admin/user-messages">Users Messages</Link></li>
        </ul>
      </div>
    </>
  );
};

export default NavDash;
