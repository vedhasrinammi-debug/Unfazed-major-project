const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', noteController.getNotes);
router.post('/', noteController.createNote);
router.get('/:id', noteController.getNoteById);
router.put('/:id', noteController.updateNote);
router.patch('/:id/toggle-sharing', noteController.toggleSharing);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
