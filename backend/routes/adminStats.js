// routes/adminStats.js
const express = require('express');
const router = express.Router();
const { getStatistics } = require('../controllers/adminStatsController');

router.get('/statistics', getStatistics);

module.exports = router;
