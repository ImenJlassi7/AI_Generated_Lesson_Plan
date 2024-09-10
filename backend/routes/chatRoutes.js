const express = require('express');
const router = express.Router();
const {saveMessage,fetchChats,sendEmail,deleteMessage} = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/chatWithAdmin',authMiddleware, saveMessage);
router.get('/admin/user-messages',fetchChats);
router.post('/emailAdmin', sendEmail);
router.delete('/admin/user-messages/:id', deleteMessage); 

module.exports = router;
