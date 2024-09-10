import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from './axiosConfig';
import './SignUp.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    try {
      const response = await axios.post('/auth/signup', { firstName, lastName, email, password, phone });
      console.log('SignUp Response:', response.data);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing up:', error);
      console.error('Error Response:', error.response);
      setError(error.response?.data?.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sign-up illustration" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSignUp}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">You Are Not A member ? Sign Up Now !</p>
         
              </div>

              <div className="divider d-flex align-items-center my-4">
              </div>

              <div className="form-outline mb-4 d-flex">
                <div className="me-2 flex-fill">
                  <input type="text" id="form3Example1" className="form-control form-control-lg"
                   value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  <label className="form-label" htmlFor="form3Example1">First Name</label>
                </div>
                <div className="ms-2 flex-fill">
                  <input type="text" id="form3Example2" className="form-control form-control-lg"
                value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  <label className="form-label" htmlFor="form3Example2">Last Name</label>
                </div>
              </div>

              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control form-control-lg"
                  value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label className="form-label" htmlFor="form3Example3">Email address</label>
              </div>

              <div className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                 value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label className="form-label" htmlFor="form3Example4">Password</label>
              </div>

              <div className="form-outline mb-3">
                <input type="password" id="form3Example5" className="form-control form-control-lg"
                   value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <label className="form-label" htmlFor="form3Example5">Confirm Password</label>
              </div>

              <div className="form-outline mb-3">
                <input type="tel" id="form3Example6" className="form-control form-control-lg"
                 value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <label className="form-label" htmlFor="form3Example6">Phone Number</label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Sign Up</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <Link to="/signin"
                  className="link-danger">Sign In</Link></p>
              </div>

              {error && <p className="error-message text-danger mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
        <p>&copy; {new Date().getFullYear()} Lesson Plans Bot. All rights reserved.</p>
        </div>
        <div>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-google"></i>
          </a>
          <a href="#!" className="text-white">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
