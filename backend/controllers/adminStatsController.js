const LessonPlan = require('../models/LessonPlan');
const User = require('../models/User');
const getStatistics = async (req, res) => {
  try {
    const totalLessonPlans = await LessonPlan.countDocuments();
    const totalUsers = await User.countDocuments();
    const generatedToday = await LessonPlan.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    });

    const mostPopularTopic = await LessonPlan.aggregate([
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const lessonPlansData = await LessonPlan.aggregate([
      {
        $match: {
          createdAt: { $exists: true }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalLessonPlans: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Create a comprehensive date range
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1); 
    const endDate = new Date();

    const dateRange = [];
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      dateRange.push(new Date(date));
    }

    const formattedData = dateRange.map(date => {
      const dateString = date.toISOString().split('T')[0];
      const dataForDate = lessonPlansData.find(item => item._id === dateString);
      return {
        date: dateString,
        totalLessonPlans: dataForDate ? dataForDate.totalLessonPlans : 0
      };
    });

    res.json({
      totalLessonPlans,
      totalUsers,
      generatedToday,
      mostPopularTopic: mostPopularTopic[0]?._id || 'N/A',
      lessonPlansData: formattedData
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getStatistics };


