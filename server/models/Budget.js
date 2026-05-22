
const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Food & Drinks', 'Entertainment', 'Shopping', 'Travel', 'Others']
  },
  limitAmount: {
    type: Number,
    required: true,
    min: [0, 'Limit capacity boundaries cannot scale below zero.']
  }
}, { timestamps: true });

// Ensure a user can only have one unique budget allocation tracker rule per category
BudgetSchema.index({ userId: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('Budget', BudgetSchema);