const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  content: {
    type: String,
    required: [true, 'Note content is required'],
    maxlength: [10000, 'Content cannot exceed 10000 characters']
  }
}, {
  timestamps: true
});

// Index for efficient queries
noteSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Note', noteSchema);
