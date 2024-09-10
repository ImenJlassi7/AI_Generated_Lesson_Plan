const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedback: { type: String, required: true },
  rating: { type: Number, required: true },
  firstName: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
}, { timestamps: true }); 

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
