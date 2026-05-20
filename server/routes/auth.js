
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please fulfill all input requirements.' });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(201).json({ 
      success: true, 
      message: 'User account provisioned successfully! Redirecting to login context...' 
    });

  } catch (error) {
    console.error("Signup Processing Error:", error);
    return res.status(500).json({ success: false, message: 'Server compilation error during registration.' });
  }
});

// ==========================================
// ROUTE: POST /api/auth/login
// DESCRIPTION: Authenticates user credentials and sends back a secure token session
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Failsafe 1: Check basic parameters presence bounds
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    // Failsafe 2: Search user email ledger profile records
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email address or credential records match.' });
    }

    // Failsafe 3: Validate incoming password match against hashed db version
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password credential records match.' });
    }

    // Failsafe 4: Issue a cryptographic secure signature token for the browser session
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' } // Session valid for a whole week before auto-expiry
    );

    // Respond back with confirmation and user parameters payload to mount onto layout dashboard
    return res.status(200).json({
      success: true,
      message: 'Authentication successful! Access authorized.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        total_balance: user.total_balance
      }
    });

  } catch (error) {
    console.error("Login Processing Error:", error);
    return res.status(500).json({ success: false, message: 'Server compilation error during logging processes.' });
  }
});

module.exports = router;