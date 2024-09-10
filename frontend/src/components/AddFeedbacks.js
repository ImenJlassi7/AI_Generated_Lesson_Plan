import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import styles from './AddFeedback.module.css';
import bot from './assets/helloBot.gif';
import Footer from './Footer';

axios.defaults.withCredentials = true;

function AddFeedback() {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/feedbackCreate', { feedback, rating });
      setMessage(response.data.message);
      setFeedback('');
      setRating(0);
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Failed to submit feedback. Please try again later.');
      } else if (error.request) {
        setError('No response received from server. Please check your network connection.');
      } else {
        setError('Error setting up request. Please try again later.');
      }
      setMessage('');
    }
  };

  return (
<>    <Navbar />
    <div className={styles.feedbackPage}>
    
      <div className={styles.container}>
        <div className={styles.gifContainer}>
          <img src={bot} alt="Robot GIF" className={styles.gif} />
        </div>
        <div className={styles.feedbackForm}>
          <label style={{ textAlign: 'left', marginBottom: '10px', fontSize: '30px', fontStyle: 'oblique', color: "Highlight" }}>How was your experience ?</label>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <textarea id="feedback" placeholder="Add your Feedback here..." value={feedback} onChange={(e) => setFeedback(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label style={{ textAlign: 'left', marginBottom: '10px', fontSize: '30px', fontStyle: 'oblique', color: "Highlight" }}>Rating:</label>
              <ul className={styles.rating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <li key={star} onClick={() => setRating(star)}>
                    <i className={`fa-star ${star <= rating ? 'fas' : 'far'}`} />
                  </li>
                ))}
              </ul>
            </div>
            <button type="submit" className={styles.submitBtn}>Submit Feedback</button>
          </form>
          {message && <p className={styles.successMessage}>{message}</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      </div>
    </div>
    <Footer />
 
    </>);
}

export default AddFeedback;
