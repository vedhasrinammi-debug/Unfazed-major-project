const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/conversations', messageController.getConversations);
router.get('/:clientId', messageController.getMessagesByClient);
router.post('/', messageController.sendMessage);
router.post('/:clientId/simulate-reply', messageController.simulateClientReply);

module.exports = router;
