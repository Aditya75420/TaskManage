const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createGoal,
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal
} = require('../controllers/goalController');

const router = express.Router();

// All routes are protected
router.use(protect);

// Goal routes
router.route('/')
  .get(getGoals)
  .post(createGoal);

router.route('/:id')
  .get(getGoal)
  .put(updateGoal)
  .delete(deleteGoal);

module.exports = router;
