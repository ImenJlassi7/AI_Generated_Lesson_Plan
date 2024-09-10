// components/UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import FeedbackChart from './FeedbackChart'; // Import the FeedbackChart component
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]); // State for feedbacks
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (err) {
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/fetchFeedback'); // Adjust endpoint
                setFeedbacks(response.data);
            } catch (err) {
                setError('Error fetching feedbacks');
            }
        };

        fetchUsers();
        fetchFeedbacks(); // Fetch feedbacks
    }, []);

    const handleDelete = async (id) => {
        setUserToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userToDelete}`);
            setUsers(users.filter(user => user._id !== userToDelete));
            setIsModalOpen(false);
        } catch (err) {
            setError('Error deleting user');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="user-management-container">
            <h2>User Management</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br></br>
            <br></br>

            <FeedbackChart feedbacks={feedbacks} /> {/* Render the FeedbackChart */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this user?"
            />
        </div>
    );
};

export default UserManagement;
