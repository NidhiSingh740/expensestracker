const express = require('express');
const router = express.Router();
const authGuard = require('../middleware/authGuard');
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');

// 1. GET ALL BUDGET RULES MATCHED WITH ACTUAL EXPENSES
router.get('/status', authGuard, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch all custom user budget rules safely
    const userBudgets = await Budget.find({ userId }).lean();
    
    // Fetch all expense logs to calculate current burn velocities
    const expenses = await Expense.find({ userId, transaction_type: 'expense' }).lean();

    const defaultBudgets = {
      'Food & Drinks': 6000,
      'Entertainment': 3000,
      'Shopping': 10000,
      'Travel': 5000,
      'Others': 4000
    };

    const categoryBurn = { 'Food & Drinks': 0, 'Entertainment': 0, 'Shopping': 0, 'Travel': 0, 'Others': 0 };
    expenses.forEach(tx => {
      if (categoryBurn[tx.category] !== undefined) {
        categoryBurn[tx.category] += tx.amount;
      } else {
        categoryBurn['Others'] += tx.amount;
      }
    });

    const finalStatus = Object.keys(defaultBudgets).map(catName => {
      const dbBudget = userBudgets.find(b => b.category === catName);
      const assignedLimit = dbBudget ? dbBudget.limitAmount : defaultBudgets[catName];
      
      return {
        category: catName,
        spent: categoryBurn[catName],
        limitAmount: assignedLimit,
        isCustom: !!dbBudget
      };
    });

    return res.status(200).json({ success: true, budgets: finalStatus });
  } catch (error) {
    console.error("Budget fetch framework crash:", error);
    return res.status(500).json({ success: false, message: 'Internal Server Fault reading parameters.' });
  }
});

// 2. POST UPSERT ASSIGNED CUSTOM LIMIT OVERRIDES
router.post('/upsert', authGuard, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { category, limitAmount } = req.body;

    if (!category || limitAmount === undefined || Number(limitAmount) < 0) {
      return res.status(400).json({ success: false, message: 'Invalid threshold configuration fields.' });
    }

    // Direct fallback block optimization: clear any hanging queries, update if exists, insert if new
    const budgetQuery = { userId, category };
    const budgetUpdate = { limitAmount: Number(limitAmount) };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };

    const savedRecord = await Budget.findOneAndUpdate(budgetQuery, budgetUpdate, options);

    return res.status(200).json({
      success: true,
      message: 'Budget limit preserved securely inside database records.',
      budget: savedRecord
    });
  } catch (error) {
    console.error("Database save transaction fault:", error);
    return res.status(500).json({ success: false, message: 'Database query execution failure.' });
  }
});

module.exports = router;