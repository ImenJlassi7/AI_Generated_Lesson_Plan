const Chat = require('../models/Chat'); 
const nodemailer = require('nodemailer');

const saveMessage = async (req, res) => {
    const { message } = req.body;
    const email = req.user.email;
  
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
  
    try {
      const newMessage = new Chat({ email, message });
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Error saving message' });
    }
  };

const fetchChats = async (req, res) => {
    try {
      const chats = await Chat.find({});
      res.status(200).json(chats);
    } catch (error) {
      console.error('Error fetching chats:', error);
      res.status(500).json({ message: 'Error fetching chats' });
    }
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: 'ji7184869@gmail.com', // Your email
      pass: 'iweu rtjb kxem insd', // Your email password or app password
    },
  });
  const deleteMessage = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedMessage = await Chat.findByIdAndDelete(id);
      
      if (!deletedMessage) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).json({ message: 'Error deleting message' });
    }
  };
  

  const sendEmail = async (req, res) => {
    const { email, message } = req.body;
  
    try {
      const userMessage = await Chat.findOne({ email }).sort({ createdAt: -1 }).exec();
      
      const combinedMessage = `
        This is a message from the admin of AI Generated Lessons Plans:
     
        Your problem is :  ${userMessage ? userMessage.message : 'No previous message found'} 
      
        The soulution I suggest : ${message}
        ---------------------------
        If you have any other problems please don't hesitate to contact us !
      
      `;
  
      await transporter.sendMail({
        from: 'ji7184869@gmail.com',
        to: email,
        subject: 'Message from the admin of AI Generated Lessons Plans',
        text: combinedMessage,
      });
  
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send email' });
    }
  };
  
  module.exports = {
    saveMessage,
    fetchChats,
    sendEmail,
    deleteMessage, 
  };