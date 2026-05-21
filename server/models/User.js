const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email field is required.'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password field is required.'],
    minlength: [6, 'Password must be at least 6 characters long.']
  },
  total_balance: {
    type: Number,
    default: 0
  },
  monthly_cap: {
    type: Number,
    default: 20000 // Standard fallback default monthly ceiling cap
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);