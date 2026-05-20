
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
    unique: true, // Prevents duplicate email accounts from registering
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
    default: 0 // Base structural seed balance tracked logically
  }
}, { timestamps: true }); // Automatically maintains createdAt and updatedAt records

module.exports = mongoose.model('User', UserSchema);