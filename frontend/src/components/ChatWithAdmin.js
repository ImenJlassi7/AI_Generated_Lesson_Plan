import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import Footer from './Footer';
import styles from './ChatWithAdmin.module.css'; 
import chat from './assets/chat.png';

const ChatWithAdmin = () => {
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/chatWithAdmin', { message });
      setFeedback('Message sent successfully!');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setFeedback('Failed to send message.');
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles['chat-container']}>
          <label style={{ textAlign: 'center', marginBottom: '10px', fontSize: '30px', fontStyle: 'oblique', color: "Highlight" }}>Contact the Admin</label>
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              required
              className={styles.textarea}
            />
            <button type="submit" className={styles.button}>Send Message</button>
          </form>
          {feedback && <p>{feedback}</p>}
        </div>
        <img src={chat} alt="chat GIF" className={styles['chat-gif']} />
      </div>
      <Footer />
      </>
  );
};

export default ChatWithAdmin;
