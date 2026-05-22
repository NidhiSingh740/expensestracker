const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  total_balance: {
    type: Number,
    required: true,
    default: 0
  },
  monthly_cap: {
    type: Number,
    required: true,
    default: 50000 // Sets a safe default initial cap limit
  },
  base_currency: {
    type: String,
    required: true,
    default: 'INR'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);