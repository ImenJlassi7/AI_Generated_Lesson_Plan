const express = require('express');
const { createLessonPlan, getUserLessonPlans, deleteLessonPlan } = require('../controllers/lessonPlanController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/generate',authMiddleware, createLessonPlan);
router.delete('/lessonPlan/:id', authMiddleware,deleteLessonPlan);

router.get('/user',authMiddleware, getUserLessonPlans);

module.exports = router;
