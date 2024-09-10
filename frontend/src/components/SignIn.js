import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from './axiosConfig';
import './SignIn.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('/auth/signin', { email, password });
      console.log('SignIn Response:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Error signing in:', error);
      console.error('Error Response:', error.response);
      setError(error.response?.data?.message || 'Failed to sign in. Please try again.');
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sign-in illustration" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSignIn}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb- me-3">Sign In To Your Account  </p>
             
              </div>

              <div className="divider d-flex align-items-center my-4">
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

              <div className="d-flex justify-content-between align-items-center">
           
              <a href="/forgot-password" className="text-body">Forgot password?</a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                  className="link-danger">Register</Link></p>
              </div>

              {error && <p className="error-message">{error}</p>}
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
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
