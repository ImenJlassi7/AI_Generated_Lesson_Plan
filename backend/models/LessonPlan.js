// models/LessonPlan.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonPlanSchema = new Schema({
  topic: { type: String, required: true },
  gradeLevel: { type: String, required: true },
  language: { type: String, required: true },
  content: { type: Schema.Types.Mixed, required: true },
  pdf: { type: Buffer },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const LessonPlan = mongoose.model('LessonPlan', lessonPlanSchema);

module.exports = LessonPlan;
