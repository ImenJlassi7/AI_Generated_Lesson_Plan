// FetchFeedbacks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import styles from './FetchFeedback.module.css'; // Import CSS module
import Footer from './Footer';

axios.defaults.withCredentials = true;

function FetchFeedbacks() {
  const [allFeedback, setAllFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fetchFeedback');
      setAllFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-star ${i <= rating ? 'fas' : 'far'} text-primary`} // Use 'fas' for filled stars and 'far' for empty stars
          title={`${i} star${i > 1 ? 's' : ''}`}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <Navbar />
      <div className={styles.feedbackPageWrapper}>
        <main className={styles.feedbackPage}>
          {loading ? (
            <div className={styles.spinner}></div> // Show spinner during loading
          ) : (
            <div className={styles.feedbackList}>
              {allFeedback.length > 0 ? (
                allFeedback.map((fb, index) => (
                  <div key={index} className={styles.feedbackCard}>
                    <h2> {fb.feedback}</h2> {/* Use firstName directly from feedback */}
                    <p>{fb.firstName}</p>
                    <div className={styles.rating}>{renderStars(fb.rating)}</div>
                  </div>
                ))
              ) : (
                <p>No feedback available.</p>
              )}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default FetchFeedbacks;
