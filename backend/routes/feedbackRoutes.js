const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getAllFeedback,
  deleteFeedback, 
} = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/feedbackCreate',authMiddleware, createFeedback);

router.get('/fetchFeedback', getAllFeedback);

router.delete('/deleteFeedback/:id',deleteFeedback);

module.exports = router;
