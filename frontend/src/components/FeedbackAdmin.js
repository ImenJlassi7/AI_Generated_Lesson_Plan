import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeedbackAdmin.css'; 
import NavDash from './NavDash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

axios.defaults.withCredentials = true;

function FetchFeedbacks() {
  const [allFeedback, setAllFeedback] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // Modal open state
  const [feedbackToDelete, setFeedbackToDelete] = useState(null); // Feedback ID to delete

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fetchFeedback');
      setAllFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setError('Failed to fetch feedback. Please try again later.'); // Set error message
    } finally {
      setLoading(false); // Loading is finished
    }
  };
  const deleteFeedback = async () => {
    try {
      await axios.delete(`http://localhost:5000/deleteFeedback/${feedbackToDelete}`); // Send DELETE request
      setAllFeedback((prevFeedback) => prevFeedback.filter((feedback) => feedback._id !== feedbackToDelete)); // Remove feedback from state
      closeModal(); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting feedback:', error);
      setError('Failed to delete feedback. Please try again later.');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'filled-star' : 'empty-star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const openModal = (id) => {
    setFeedbackToDelete(id); // Set the feedback ID to delete
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
    setFeedbackToDelete(null); // Clear the feedback ID
  };


  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading feedbacks...</p>
      </div>
    ); // Loading indicator
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Error message
  }

  return (
    <>
      <NavDash toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="feedback-container">
        <h2>User Feedbacks</h2>
        {allFeedback.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          <ul className="feedback-list">
            {allFeedback.map((feedback) => (
              <li key={feedback._id} className="feedback-item">
                <div className="feedback-header">
                  <p><strong>Feedback:</strong> {feedback.feedback}</p>
                  <div className="feedback-rating-container">
                  <FontAwesomeIcon 
  icon={faTrash} 
  className="trash" 
  onClick={() => openModal(feedback._id)} // Open modal on click
/>

                  </div>
                </div>
                
                <div className="feedback-rating">
                  <strong>Rating:</strong> {renderStars(feedback.rating)}
                </div>
                <div className="feedback-footer">
                  <p><strong>Submitted by:</strong> {feedback.user ? feedback.user.firstName : 'Unknown User'}</p>
                  <p><strong>Date:</strong> {new Date(feedback.createdAt).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Modal for confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={deleteFeedback}
        title="Confirm Deletion"
        message="Are you sure you want to delete this feedback?"
      />
    </>
  );
}

export default FetchFeedbacks;
