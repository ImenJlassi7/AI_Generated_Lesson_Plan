const Feedback = require('../models/Feedback');
const User = require('../models/User');
const createFeedback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const feedback = new Feedback({
      feedback: req.body.feedback,
      rating: req.body.rating,
      firstName: user.firstName, 
      user: req.user._id, 
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ message: 'Failed to submit feedback', error });
  }
};



const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'firstName');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedbacks', error });
  }
};


const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting feedback with ID:', id);
    const feedback = await Feedback.findByIdAndDelete(id); 

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error); 
    res.status(500).json({ message: 'Failed to delete feedback' });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
  deleteFeedback, 
};
