const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const api="mongodb+srv://Imen77:lBMe4mmUcSxjcP9a@cluster0.qqi6fog.mongodb.net/lessonPlansDB?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(api, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
