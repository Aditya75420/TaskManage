const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController');

const router = express.Router();

// All routes are protected
router.use(protect);

// Note routes
router.route('/')
  .get(getNotes)
  .post(createNote);

router.route('/:id')
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;
