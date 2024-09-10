import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import Footer from './Footer';
import Modal from './Modal';
import jsPDF from 'jspdf';
import ro from './assets/ro.png';
import styles from './History.module.css'; // Import CSS Module

function History() {
  const [lessonPlans, setLessonPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonPlanToDelete, setLessonPlanToDelete] = useState(null);

  useEffect(() => {
    const fetchLessonPlans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
        setLessonPlans(response.data);
      } catch (error) {
        console.error('Error fetching lesson plans:', error);
        setError('Failed to fetch lesson plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLessonPlans();
  }, []);

  const downloadPDF = (lessonPlan, filename = 'lesson-plan.pdf') => {
    const img = new Image();
    img.src = ro;

    img.onload = function () {
      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      const margin = 10;
      const lineHeight = 10;

      const imageWidth = 50;
      const imageHeight = 50;
      const imageX = pageWidth - imageWidth - margin;
      const imageY = pageHeight - imageHeight - margin;

      // Add the image to the first page
      doc.addImage(img, 'PNG', imageX, imageY, imageWidth, imageHeight);

      // Add text content
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text(`Lesson Plan: ${lessonPlan.topic}`, 20, 20);
      doc.text(`Grade Level: ${lessonPlan.gradeLevel}`, 20, 30);
      doc.text(`Language: ${lessonPlan.language}`, 20, 40);

      doc.setFontSize(12);
      doc.setLineHeightFactor(1);
      const content = lessonPlan.content.split('\n');
      let yPosition = 50;

      content.forEach((line, index) => {
        if (yPosition > pageHeight - 50) {
          doc.addPage();
          yPosition = 20;

          // Add the image to each new page
          doc.addImage(img, 'PNG', imageX, imageY, imageWidth, imageHeight);
        }
        doc.text(line, 20, yPosition);
        yPosition += lineHeight;
      });

      // Download the generated PDF
      doc.save(filename);
    };
  };

  const deleteLessonPlan = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/lessonPlan/${id}`, { withCredentials: true });
      setLessonPlans(lessonPlans.filter(plan => plan._id !== id));
      setIsModalOpen(false); // Close modal after deletion
    } catch (error) {
      console.error('Error deleting lesson plan:', error);
      setError('Failed to delete lesson plan. Please try again later.');
    }
  };

  const handleDeleteClick = (id) => {
    setLessonPlanToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    deleteLessonPlan(lessonPlanToDelete);
  };
  return (
    <>      <Navbar />

    <div className={styles.historyPage}>
      <br></br>
      <header className={styles.historyHeader}>
        <label style={{ textAlign: 'center', marginBottom: '10px', fontSize: '40px', fontStyle: 'oblique', color: 'Highlight' }}>
          Lesson Plan History
        </label>
      </header>
      {loading ? (
        <div className={styles.spinner}></div>
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : (
        <div className={styles.scrollableTableContainer}>
          <table className={styles.lessonPlansTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Grade Level</th>
                <th>Language</th>
                <th>Download</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {lessonPlans.map((plan) => (
                <tr key={plan._id}>
                  <td>{plan.topic}</td>
                  <td>{plan.gradeLevel}</td>
                  <td>{plan.language}</td>
                  <td>
                    <button className={`${styles.actionBtn} ${styles.downloadBtn}`} onClick={() => downloadPDF(plan)}>Download PDF</button>
                  </td>
                  <td>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDeleteClick(plan._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this lesson plan?"
      />
    </div>
    <Footer />
    </> );
  
}

export default History;
