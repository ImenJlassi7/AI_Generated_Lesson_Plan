const User = require('../models/User'); 

const authMiddleware = async (req, res, next) => {
  try {
    // Check if the session contains user data
    if (req.session && req.session.user) {

      const user = await User.findById(req.session.user._id);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }

      req.user = user;

      next();
    } else {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};

module.exports = authMiddleware;
