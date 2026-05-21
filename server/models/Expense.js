
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  merchant_name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Food & Drinks', 'Entertainment', 'Shopping', 'Travel', 'Income', 'Others']
  },
  transaction_type: {
    type: String,
    required: true,
    enum: ['expense', 'income']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);