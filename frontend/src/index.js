import React from 'react';
import ReactDOM from 'react-dom';
import Body from './components/Body';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import History from './components/History';
import AddFeedbacks from './components/AddFeedbacks';
import FetchFeedbacks from './components/FetchFeedbacks';
import First from './components/First';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import ChatWithAdmin from './components/ChatWithAdmin';
import UserMessages from './components/UserMessages';
import FeedbackAdmin from './components/FeedbackAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Body />} />
        <Route path="/first" element={<First />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/chatWithAdmin" element={<ChatWithAdmin />} />
        <Route path="/admin/user-messages" element={<UserMessages />} />
        <Route path="/adminFeedback" element={<FeedbackAdmin />} />


        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/FetchFeedbacks" element={<FetchFeedbacks />} />
        <Route path="/AddFeedbacks" element={<AddFeedbacks />} />

        <Route path="/history" element={<History />} /> {/* Add the History route */}
        <Route path="/" element={<Navigate to="/first" />} /> {/* Use Navigate to redirect '/' to '/signin' */}
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
