import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import UserManagement from './UserManagement';
import TotalLessonPlansChart from './TotalLessonPlansChart';
import NavDash from './NavDash';

const Dashboard = () => {
  const [statistics, setStatistics] = useState({});
  const [chartData, setChartData] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/statistics');
        setStatistics(response.data);

        // Use the lesson plans data for the chart
        const lessonPlansData = response.data.lessonPlansData || [];
        setChartData(lessonPlansData.map(item => ({
          date: item.date, 
          totalLessonPlans: item.totalLessonPlans // Get total lesson plans for that date
        })));
      } catch (error) {
        console.error('Error fetching statistics', error);
      }
    };

    fetchStatistics();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <NavDash toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="dashboard-container">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3 className="stat-title">Total Lesson Plans</h3>
            <p className="stat-value">{statistics.totalLessonPlans}</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-title">Total Users</h3>
            <p className="stat-value">{statistics.totalUsers}</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-title">Generated Plans Today</h3>
            <p className="stat-value">{statistics.generatedToday}</p>
          </div>
          <div className="stat-item">
            <h3 className="stat-title">Most Popular Topic</h3>
            <p className="stat-value">{statistics.mostPopularTopic}</p>
          </div>
        </div>
        
        <br />
        <TotalLessonPlansChart data={chartData} />

        <UserManagement />
      </div>
    </div>
  );
};

export default Dashboard;
