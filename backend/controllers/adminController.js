const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
  const { password } = req.body;

  try {
    const admin = await Admin.findOne({ name: 'admin' });
    console.log('Admin query result:', admin); 
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: admin._id }, 'c30f80bb918cdd32826390a7c1a121d3e534182a00a7b627c1f5f6c01e56d2fb06ee84f94992ba0ca93f821ea197afa867c0743bc4758523121e1674ec2b74b1', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const signOut = (req, res) => {
  try {
    // If you have any client-side tokens stored in cookies, you might want to clear them
    res.clearCookie('authToken'); // Replace 'authToken' with the actual token cookie name if applicable
    
    // Provide a more detailed response, potentially helpful for the client
    res.status(200).json({
      message: 'Signed out successfully',
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred during sign out',
      error: error.message,
    });
  }
};


module.exports = { adminLogin ,signOut};
