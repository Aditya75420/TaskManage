const Goal = require('../models/Goal');

// @desc    Create a new goal
// @route   POST /api/goals
// @access  Private
const createGoal = async (req, res) => {
  try {
    const { title, targetDate } = req.body;

    if (!title || !targetDate) {
      return res.status(400).json({ 
        message: 'Title and target date are required' 
      });
    }

    const goal = await Goal.create({
      user: req.user._id,
      title,
      targetDate
    });

    res.status(201).json(goal);
  } catch (error) {
    console.error('Create goal error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error creating goal' });
  }
};

// @desc    Get all goals for user
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({ message: 'Server error fetching goals' });
  }
};

// @desc    Get single goal
// @route   GET /api/goals/:id
// @access  Private
const getGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json(goal);
  } catch (error) {
    console.error('Get goal error:', error);
    res.status(500).json({ message: 'Server error fetching goal' });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res) => {
  try {
    const { title, targetDate, progress } = req.body;

    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Update fields
    if (title !== undefined) goal.title = title;
    if (targetDate !== undefined) goal.targetDate = targetDate;
    if (progress !== undefined) goal.progress = progress;

    const updatedGoal = await goal.save();
    res.json(updatedGoal);
  } catch (error) {
    console.error('Update goal error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error updating goal' });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Delete goal error:', error);
    res.status(500).json({ message: 'Server error deleting goal' });
  }
};

module.exports = {
  createGoal,
  getGoals,
  getGoal,
  updateGoal,
  deleteGoal
};
