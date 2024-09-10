import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Body.module.css';
import botGif from './assets/bot.gif';
import jsPDF from 'jspdf';
import Navbar from './NavBar';
import Footer from './Footer';
import ro from './assets/ro.png';

axios.defaults.withCredentials = true;

function Body() {
  const [topic, setTopic] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [language, setLanguage] = useState('en');
  const [lessonPlan, setLessonPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userFirstName, setUserFirstName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/current-user');
        setUserFirstName(response.data.user.firstName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/generate', { topic, gradeLevel, language });
      console.log('Response:', response.data);
      setLessonPlan(response.data.lessonPlan.content); 
    } catch (error) {
      console.error('Error generating lesson plans:', error);
      if (error.response) {
        setError(error.response.data.message || 'Failed to generate lesson plans. Please try again later.');
      } else if (error.request) {
        setError('No response received from server. Please check your network connection.');
      } else {
        setError('Error setting up request. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (lessonPlan) => {
    if (!lessonPlan) return;

    const img = new Image();
    img.src = ro;

    img.onload = function () {
      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      const margin = 10;
      const maxLineHeight = pageHeight - margin * 2 - 50;
      const lineHeight = 10;

      const imageWidth = 50;
      const imageHeight = 50;
      const imageX = pageWidth - imageWidth - margin;
      const imageY = pageHeight - imageHeight - margin;

      let cursorY = margin + 10;

      const textLines = doc.splitTextToSize(lessonPlan, pageWidth - margin * 2);

      textLines.forEach((line) => {
        if (cursorY + lineHeight > maxLineHeight) {
          doc.addPage();
          cursorY = margin + 10;
        }

        doc.text(line, margin, cursorY);
        cursorY += lineHeight;

        doc.addImage(img, 'PNG', imageX, imageY, imageWidth, imageHeight);
      });

      doc.save('lesson-plan.pdf');
    };

    img.onerror = function () {
      console.error("Failed to load image.");
    };
  };

  const formatLessonPlan = (lessonPlan) => {
    const sections = lessonPlan.split('\n\n'); 
  
    return sections.map((section, index) => {

      const lines = section.split('\n');
      
      return (
        <div key={index} className={styles.lessonSection}>
          {lines.map((line, idx) => {
            const isTitle = line.trim().endsWith(':');
            
            return isTitle ? (
              <label key={idx} style={{ fontSize: '17px', fontWeight: 'bold' }}>
                {line}
              </label>
            ) : (
              <p key={idx}>{line}</p>
            );
          })}
        </div>
      );
    });
  };
  
  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className={styles.lessonPlansBot}>

      <label className={styles.animatedGreeting} style={{ textAlign: 'center', marginBottom: '10px', fontSize: '40px', fontStyle: 'oblique', color: 'Highlight', fontWeight: 'bold' }}>
  Hello, {userFirstName} !
</label>

       
        <div className={styles.container}>
       
          <div className={styles.formContainer}>
            <label style={{ textAlign: 'center', marginBottom: '10px', fontSize: '20px', fontStyle: 'oblique', color: 'Highlight' }}>
              Start generating lesson plans !
            </label>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <input type="text" placeholder="Enter the topic..." value={topic} onChange={(e) => setTopic(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <input type="text" placeholder="Enter the grade level..." value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="English">English</option>
                  <option value="Français">French</option>
                </select>
              </div>
              <button type="submit" className={styles.generateBtn} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Lesson Plans'}
              </button>
            </form>
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>
          {lessonPlan === '' && (
            <div className={styles.botContainer}>
              <img src={botGif} alt="Bot GIF" className={styles.botGif} />
            </div>
          )}
          {lessonPlan && (
            <div className={styles.lessonPlanContainer}>
              <div className={styles.lessonPlan}>
                {formatLessonPlan(lessonPlan)}
                <button className={styles.downloadBtn} onClick={() => downloadPDF(lessonPlan)}>
                  Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      </>
  );
}

export default Body;
