// components/Modal.js
import React from 'react';
import './Modal.css'; // Make sure to import your updated CSS styles

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div className={`modal-popup-wrap ${isOpen ? 'show' : ''}`}>
            <div className={`modal-popup-box transform-in`}>
                <h2 className="modal-popup-h2">{title}</h2>
                <h3 className="modal-popup-h3">{message}</h3>
                <button 
                    className="modal-close-btn" 
                    onClick={handleClose} 
                    aria-label="Close modal" // Add an aria-label for accessibility
                >
                    x
                </button>
                <div className="modal-footer">
                    <button type="button" className="modal-cancel-button" onClick={handleClose}>Close</button>
                    <button type="button" className="modal-confirm-button" onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
