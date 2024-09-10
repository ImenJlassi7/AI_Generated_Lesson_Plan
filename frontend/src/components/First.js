// First.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './First.css';
import hello from './assets/hello.gif';

const First = () => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "O ur mission is to help you create the best lesson plans for any topic or grade level. You can generate lesson plans in English or French. Sign in to start generating lesson plans, or if you're not a member yet, don't hesitate to join us.";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust typing speed here (lower is faster)
    
    return () => clearInterval(typingInterval);
  }, [fullText]);

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="first-wrapper">
      <div className="first-content">
        <img src={hello} alt="hello" className="first-bot-hello" />
        <h1 className="first-h1">Welcome to AI Generated Lesson Plan!</h1>
        <h3 className="first-h3">
          {displayedText}<span className="first-cursor">|</span> {/* Blinking cursor */}
        </h3>
        <div className="first-buttons">
          <button className="first-btn first-signin-btn" onClick={handleSignIn}>Sign In</button>
          <button className="first-btn first-signup-btn" onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
      <div className="first-container">
        <div className="first-wave"></div>
        <div className="first-wave"></div>
        <div className="first-wave"></div>
      </div>
    </div>
  );
};

export default First;
