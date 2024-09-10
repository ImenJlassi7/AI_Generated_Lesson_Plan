import React from 'react';
import './MessageModal.css'; // Add styles for the modal if needed

const MessageModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h5 className="modal-title">{title}</h5>
        <p>{message}</p>
        <button onClick={onClose} className="custom-btn custom-btn-primary">Close</button>
      </div>
    </div>
  );
};

export default MessageModal;
