import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import ro from './assets/ro.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faHistory, faComment, faEye, faArrowRightFromBracket, faHandPointRight, faComments } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();

  
  const handleSignOut = async () => {

    try {
      const response = await axios.post('http://localhost:5000/auth/signout', {}, { withCredentials: true });
      console.log('SignOut Response:', response.data);
      navigate('/signin');
    } catch (error) {
      console.error('Error sign Out in:', error);
      console.error('Error Response:', error.response);
    }
  };

  return (
    <nav className="navbar navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          <img src={ro} alt="ro img" className="navbar-ro-img" />
          Welcome To Lesson Plan Bot
        </Link>
        <FontAwesomeIcon icon={faHandPointRight} className="navbar-hand fa-beat-fade" />

        <button
          className="navbar-toggler"
          type="button"
          style={{ fontSize: '25px' }}
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">
                  Generate Lessons Plans
                  <FontAwesomeIcon icon={faRobot} className="navbar-icon-spacing fa-beat-fade" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/history">
                  Lessons Plans History
                  <FontAwesomeIcon icon={faHistory} className="navbar-icon fa-beat-fade" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AddFeedbacks">
                  Add Feedback
                  <FontAwesomeIcon icon={faComment} className="navbar-feedback fa-beat-fade" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/FetchFeedbacks">
                  Check Feedbacks
                  <FontAwesomeIcon icon={faEye} className="navbar-eye fa-beat-fade" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chatWithAdmin">
                  Contact Us
                  <FontAwesomeIcon icon={faComments} className="navbar-msg fa-beat-fade" />
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
                  Sign Out
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className="navbar-out fa-beat-fade" />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
