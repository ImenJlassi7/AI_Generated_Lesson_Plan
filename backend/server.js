const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sessionConfig = require('./config/sessionConfig');
const authRoutes = require('./routes/auth'); 
const lessonPlanRoutes = require('./routes/lessonPlanRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminStatsRoutes = require('./routes/adminStats');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

require('dotenv').config();

const app = express();
const port = 5000;

// Connect to MongoDB
connectDB();

// Apply middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session(sessionConfig)); // Utilisation de la configuration des sessions importée


// Attach user to request middleware (if needed)
// app.use(attachUserToRequest); 

// Routes that require authentication should use the authMiddleware
app.use('/admin',  adminRoutes);
app.use('/admin' , adminStatsRoutes);


// Public routes
app.use('/auth', authRoutes); 
app.use('/', lessonPlanRoutes);
app.use('/', feedbackRoutes);
app.use('/api', userRoutes);
app.use(chatRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
