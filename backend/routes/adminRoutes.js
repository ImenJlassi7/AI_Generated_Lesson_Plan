const express = require('express');
const router = express.Router();
const { adminLogin,signOut } = require('../controllers/adminController');

router.get('/test', (req, res) => {
  res.status(200).send('Admin route is working');
});

router.post('/admin-login',adminLogin);
router.post('/signout',signOut);
module.exports = router;
