import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './TotalLessonPlansChart.css';

const TotalLessonPlansChart = ({ data }) => {
  // Create a full range of dates for the chart starting from '2024-08-10'
  const startDate = new Date('2024-08-10');
  const fullRangeData = [];

  // Populate the full range data from start date to today
  for (let date = new Date(startDate); date <= new Date(); date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toISOString().split('T')[0];
    const entry = data.find(item => item.date === formattedDate);
    fullRangeData.push({
      date: formattedDate,
      totalLessonPlans: entry ? entry.totalLessonPlans : 0,
    });
  }

  return (
    <div className="chart-container">
      <h2 className="chart-title">Total Lesson Plans Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={fullRangeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="totalLessonPlans" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalLessonPlansChart;
