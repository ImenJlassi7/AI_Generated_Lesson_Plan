const express = require('express');
const { signUp, signIn, signOut ,forgotPassword,resetPassword,getCurrentUser} = require('../controllers/authController');

const router = express.Router();
router.post('/forgot-password', forgotPassword);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.post('/reset-password', resetPassword);
router.get('/current-user', getCurrentUser);

module.exports = router;
