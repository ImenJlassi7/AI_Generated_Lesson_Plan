const express = require('express');
const { fetchUsers,deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get('/users', fetchUsers);
router.delete('/users/:id',deleteUser);

module.exports = router;
