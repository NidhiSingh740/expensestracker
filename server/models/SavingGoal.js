

const mongoose = require('mongoose');

const SavingGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goalName: {
    type: String,
    required: true,
    trim: true
  },
  targetAmount: {
    type: Number,
    required: true,
    min: [1, 'Target threshold caps must be at least ₹1.']
  },
  currentAmount: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Allocated asset values cannot drop below zero.']
  },
  targetDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('SavingGoal', SavingGoalSchema);