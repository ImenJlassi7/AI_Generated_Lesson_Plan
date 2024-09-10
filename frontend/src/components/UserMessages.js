import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserMessages.css';
import NavDash from './NavDash';
import Modal from './Modal'; // Import the Modal component

const UserMessages = () => {
  const [messages, setMessages] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [messageToSend, setMessageToSend] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [modalMessage, setModalMessage] = useState(''); // State for the message displayed in the modal
  const [isSuccess, setIsSuccess] = useState(null); // State to track success or failure

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/user-messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching user messages', error);
      }
    };

    fetchMessages();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleSendMessage = async () => {
    try {
      await axios.post('http://localhost:5000/emailAdmin', {
        email: recipientEmail,
        message: messageToSend,
      });
      setIsSuccess(true);
      setModalMessage('Message sent successfully!');
      setMessageToSend('');
    } catch (error) {
      setIsSuccess(false);
      setModalMessage('Failed to send the message. Please try again.');
      console.error('Error sending message', error);
    }
  };

  const handleDeleteMessage = async () => {
    try {
      await axios.delete(`http://localhost:5000/admin/user-messages/${messageToDelete._id}`);
      setMessages(messages.filter((message) => message._id !== messageToDelete._id));
      setIsSuccess(true);
      setModalMessage('Message deleted successfully!');
      setModalOpen(false); // Close the delete confirmation modal after success
    } catch (error) {
      setIsSuccess(false);
      setModalMessage('Failed to delete the message. Please try again.');
      console.error('Error deleting message', error);
    }
  };

  const openDeleteModal = (message) => {
    setMessageToDelete(message);
    setModalOpen(true);
  };

  const closeSendMessageModal = () => {
    setModalMessage(''); // Clear the modal message
    setIsSuccess(null); // Reset success/failure state
    document.getElementById('sendMessageModal').click(); // This simulates a click on the close button
  };

  return (
    <>
      <NavDash toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="container user-messages-container mt-4">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">User Email</th>
                <th scope="col">Message</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message._id}> {/* Use message._id for key */}
                  <td>{message.email}</td>
                  <td>{message.message}</td>
                  <td>{new Date(message.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      type="button"
                      className="custom-btn custom-btn-primary"
                      data-toggle="modal"
                      data-target="#sendMessageModal"
                      onClick={() => {
                        setRecipientEmail(message.email);
                        setModalMessage(''); // Clear previous modal messages
                        setIsSuccess(null); // Reset success/failure state
                      }}
                    >
                      Answer
                    </button>
                    <button
                      type="button"
                      className="custom-btn custom-btn-danger"
                      onClick={() => openDeleteModal(message)} // Call delete modal handler
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal fade" id="sendMessageModal" tabIndex="-1" role="dialog" aria-labelledby="sendMessageModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="sendMessageModalLabel">New Message</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {modalMessage && (
                  <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {modalMessage}
                  </div>
                )}
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                    <input type="text" className="form-control" id="recipient-name" value={recipientEmail} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label">Message:</label>
                    <textarea
                      className="form-control"
                      id="message-text"
                      value={messageToSend}
                      onChange={(e) => setMessageToSend(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="custom-btn custom-btn-primary">Send message</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleDeleteMessage}
          title="Confirm Delete"
          message="Are you sure you want to delete this message?"
        />
      </div>
    </>
  );
};

export default UserMessages;
