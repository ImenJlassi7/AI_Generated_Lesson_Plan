// components/FeedbackChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FeedbackChart = ({ feedbacks }) => {
    // Prepare data for the chart
    const ratingCounts = Array(5).fill(0); // Assuming 5-star rating

    feedbacks.forEach(feedback => {
        if (feedback.rating >= 1 && feedback.rating <= 5) {
            ratingCounts[feedback.rating - 1]++; // Increment count for the rating
        }
    });

    const data = {
        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        datasets: [
            {
                label: 'Number of Feedbacks',
                data: ratingCounts,
                backgroundColor: 'rgba(5, 92, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>User Feedback Ratings</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default FeedbackChart;
