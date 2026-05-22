const express = require('express');
const router = express.Router();
const authGuard = require('../middleware/authGuard');
const SavingGoal = require('../models/SavingGoal');
const User = require('../models/User');

// 1. GET /api/savings/list
router.get('/list', authGuard, async (req, res) => {
  try {
    const goals = await SavingGoal.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, goals });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error fetching goals.' });
  }
});

// 2. POST /api/savings/create - Fully Fortified Date Validation Engine
router.post('/create', authGuard, async (req, res) => {
  try {
    const { goalName, targetAmount, targetDate } = req.body;
    
    if (!goalName || !targetAmount || !targetDate) {
      return res.status(400).json({ success: false, message: 'All target parameters must be completed.' });
    }

    // Strip out all accidental spaces from the raw date payload string
    const sanitizedDateString = String(targetDate).replace(/\s+/g, '');

    let normalizedDate = new Date(sanitizedDateString);
    
    // If standard parsing returns invalid, run a granular sub-string split fallback
    if (isNaN(normalizedDate.getTime())) {
      const parts = sanitizedDateString.split('-');
      if (parts.length === 3) {
        // Match condition for explicitly typed string sequences: DD-MM-YYYY
        if (parts[0].length === 2 && parseInt(parts[0]) <= 31) {
          normalizedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        } 
        // Match condition for explicitly typed string sequences: YYYY-MM-DD
        else if (parts[0].length === 4) {
          normalizedDate = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
        }
      }
    }

    // Hard verification gate to block bad database rows
    if (isNaN(normalizedDate.getTime())) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid date validation structure. Please specify date strictly using YYYY-MM-DD formatting.' 
      });
    }

    const newGoal = new SavingGoal({
      userId: req.user.userId,
      goalName: goalName.trim(),
      targetAmount: Number(targetAmount),
      targetDate: normalizedDate
    });

    await newGoal.save();
    return res.status(200).json({ success: true, message: 'Savings goal initialized successfully!', goal: newGoal });
  } catch (error) {
    console.error("Savings error log details:", error);
    return res.status(500).json({ success: false, message: 'Failed to write goal asset records to cluster.' });
  }
});

// 3. POST /api/savings/allocate/:id
router.post('/allocate/:id', authGuard, async (req, res) => {
  try {
    const userId = req.user.userId;
    const goalId = req.params.id;
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: 'Allocation value must be greater than zero.' });
    }

    const userProfile = await User.findById(userId);
    if (userProfile.total_balance < Number(amount)) {
      return res.status(400).json({ success: false, message: 'Insufficient liquid balance pool to fund this target allocation.' });
    }

    const goal = await SavingGoal.findOne({ _id: goalId, userId });
    if (!goal) return res.status(404).json({ success: false, message: 'Savings target slot not found.' });

    userProfile.total_balance -= Number(amount);
    goal.currentAmount += Number(amount);

    await userProfile.save();
    await goal.save();

    return res.status(200).json({
      success: true,
      message: `Successfully allocated funds.`,
      newBalance: userProfile.total_balance,
      goal
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Allocation transaction framework fault.' });
  }
});

// 4. DELETE /api/savings/dissolve/:id
router.post('/dissolve/:id', authGuard, async (req, res) => {
  try {
    const userId = req.user.userId;
    const goalId = req.params.id;

    const goal = await SavingGoal.findOne({ _id: goalId, userId });
    if (!goal) return res.status(404).json({ success: false, message: 'Savings goal not found.' });

    const userProfile = await User.findById(userId);
    userProfile.total_balance += goal.currentAmount;

    await userProfile.save();
    await SavingGoal.deleteOne({ _id: goalId });

    return res.status(200).json({ success: true, newBalance: userProfile.total_balance });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to dissolve savings target.' });
  }
});

module.exports = router;