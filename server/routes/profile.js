const express = require('express');
const router = express.Router();
const authGuard = require('../middleware/authGuard');
const User = require('../models/User');
const Expense = require('../models/Expense');
const Budget = require('../models/Budget');
const SavingGoal = require('../models/SavingGoal');

// 1. GET COMPREHENSIVE PROFILE & METRICS TELEMETRY
router.get('/meta', authGuard, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'Profile reference missing.' });

    const totalTxCount = await Expense.countDocuments({ userId });
    const totalGoalsCount = await SavingGoal.countDocuments({ userId });

    // DYNAMIC FINANCIAL HEALTH TIER COMPUTATION
    let financialTier = "Standard Node";
    let tierColor = "#3b82f6"; // Blue Default

    const currentBalance = user.total_balance || 0;
    if (currentBalance > 200000) {
      financialTier = "Alpha Liquidity Node";
      tierColor = "#a855f7"; // Purple
    } else if (currentBalance >= 50000 && currentBalance <= 200000) {
      financialTier = "Resilient Growth Vector";
      tierColor = "#10b981"; // Emerald
    } else if (currentBalance < 5000) {
      financialTier = "Capital Restricted Tier";
      tierColor = "#f43f5e"; // Rose Warning
    }

    return res.status(200).json({
      success: true,
      profile: {
        name: user.name,
        email: user.email,
        total_balance: currentBalance,
        monthly_cap: user.monthly_cap !== undefined ? user.monthly_cap : 50000,
        base_currency: user.base_currency || 'INR'
      },
      diagnostics: {
        totalTxCount,
        totalGoalsCount,
        financialTier,
        tierColor
      }
    });
  } catch (error) {
    console.error("Profile metadata compile crash:", error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// 2. POST UPDATE CONFIGURATION CONSTANTS
router.post('/update', authGuard, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, monthly_cap, base_currency } = req.body;

    // Use a direct update selector query to bypass deep validation bottlenecks
    const updatePayload = {};
    if (name) updatePayload.name = name.trim();
    if (monthly_cap !== undefined) updatePayload.monthly_cap = Number(monthly_cap);
    if (base_currency) updatePayload.base_currency = base_currency;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatePayload },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ success: false, message: 'Account context absent.' });

    return res.status(200).json({
      success: true,
      message: 'System parameters successfully synchronized onto user schema nodes.',
      profile: updatedUser
    });
  } catch (error) {
    console.error("Profile parameters save fault:", error);
    return res.status(500).json({ success: false, message: 'Database push error adjusting profile variables.' });
  }
});

// 3. POST PURGE ALL LEDGER RECORDS
router.post('/purge', authGuard, async (req, res) => {
  try {
    const userId = req.user.userId;
    await Expense.deleteMany({ userId });
    await Budget.deleteMany({ userId });
    await SavingGoal.deleteMany({ userId });

    await User.findByIdAndUpdate(userId, { $set: { total_balance: 0, monthly_cap: 50000 } });

    return res.status(200).json({
      success: true,
      message: 'Database sandbox variables cleared safely.'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to purge data infrastructure layers cleanly.' });
  }
});

module.exports = router;