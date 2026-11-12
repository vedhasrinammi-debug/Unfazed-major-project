const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', planController.getPlans);
router.get('/current', protect, planController.getCurrentSubscription);
router.post('/upgrade', protect, planController.upgradePlan);

module.exports = router;
