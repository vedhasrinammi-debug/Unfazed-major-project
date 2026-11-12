const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/dashboard', analyticsController.getDashboardOverview);
router.get('/charts', analyticsController.getAnalyticsCharts);

module.exports = router;
