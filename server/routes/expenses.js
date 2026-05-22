

const express = require('express');
const router = express.Router();
const authGuard = require('../middleware/authGuard');
const Expense = require('../models/Expense');
const User = require('../models/User');

// 1. GET /api/expenses/ledger - High-Density Filtered & Paginated Transaction Engine
router.get('/ledger', authGuard, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Unpack sorting, pagination, and filter queries with clean fallback baselines
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8; 
    const categoryFilter = req.query.category || 'All';
    const typeFilter = req.query.type || 'All';
    const sortBy = req.query.sortBy || 'newest';

    // Construct the database match criteria dynamically
    const queryCondition = { userId };
    
    if (categoryFilter !== 'All') {
      queryCondition.category = categoryFilter;
    }
    
    if (typeFilter !== 'All') {
      queryCondition.transaction_type = typeFilter.toLowerCase();
    }

    // Determine the sorting configuration
    let sortCondition = { timestamp: -1 }; // Newest default
    if (sortBy === 'oldest') sortCondition = { timestamp: 1 };
    else if (sortBy === 'highest') sortCondition = { amount: -1 };
    else if (sortBy === 'lowest') sortCondition = { amount: 1 };

    // Execute paginated database queries simultaneously
    const totalRecords = await Expense.countDocuments(queryCondition);
    const ledgerItems = await Expense.find(queryCondition)
      .sort(sortCondition)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return res.status(200).json({
      success: true,
      records: ledgerItems,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit) || 1,
        totalItems: totalRecords
      }
    });
  } catch (error) {
    console.error("Ledger query crash:", error);
    return res.status(500).json({ success: false, message: 'Internal Server Error compiling data grid views.' });
  }
});

// 2. DELETE /api/expenses/evict/:id - Rebalancing Deletion Engine
router.post('/evict/:id', authGuard, async (req, res) => {
  try {
    const userId = req.user.userId;
    const txId = req.params.id;

    // Locate the target transaction item securely
    const transaction = await Expense.findOne({ _id: txId, userId });
    if (!transaction) return res.status(404).json({ success: false, message: 'Transaction record not found.' });

    const userProfile = await User.findById(userId);
    if (!userProfile) return res.status(404).json({ success: false, message: 'User reference not found.' });

    // REVERSE REBALANCING MATHEMATICAL SCRIPT
    // If we delete an expense, we refund that money back to the liquid balance pool. 
    // If we delete income, we subtract it from the pool.
    if (transaction.transaction_type === 'expense') {
      userProfile.total_balance += transaction.amount;
    } else if (transaction.transaction_type === 'income') {
      userProfile.total_balance -= transaction.amount;
    }

    // Persist balance changes and delete the transaction document matching the ID
    await userProfile.save();
    await Expense.deleteOne({ _id: txId });

    return res.status(200).json({
      success: true,
      message: 'Transaction successfully evicted. Account balance balances re-indexed.',
      newBalance: userProfile.total_balance
    });
  } catch (error) {
    console.error("Eviction failure:", error);
    return res.status(500).json({ success: false, message: 'Failed to balance account states during eviction.' });
  }
});

module.exports = router;