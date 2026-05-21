
const express = require('express');
const router = express.Router();
const authGuard = require('../middleware/authGuard');
const Expense = require('../models/Expense');
const User = require('../models/User');

// GET /api/charts/breakdown - Detailed Portfolio Aggregations
router.get('/breakdown', authGuard, async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1. Fetch entire historical log stream for this user
    const totalHistory = await Expense.find({ userId }).sort({ timestamp: -1 });

    let totalIncome = 0;
    let totalExpense = 0;

    // Initial structure map values for categorical breakdown
    const categoryTotals = {
      'Food & Drinks': 0,
      'Entertainment': 0,
      'Shopping': 0,
      'Travel': 0,
      'Others': 0
    };

    // Tracking vendor profiles dictionary maps
    const merchantMetrics = {};

    totalHistory.forEach(tx => {
      if (tx.transaction_type === 'income') {
        totalIncome += tx.amount;
      } else if (tx.transaction_type === 'expense') {
        totalExpense += tx.amount;
        
        // Categorical summation block
        if (categoryTotals[tx.category] !== undefined) {
          categoryTotals[tx.category] += tx.amount;
        } else {
          categoryTotals['Others'] += tx.amount;
        }

        // Merchant profile clustering block
        if (!merchantMetrics[tx.merchant_name]) {
          merchantMetrics[tx.merchant_name] = { name: tx.merchant_name, spent: 0, count: 0 };
        }
        merchantMetrics[tx.merchant_name].spent += tx.amount;
        merchantMetrics[tx.merchant_name].count += 1;
      }
    });

    // Format categorical map structure matching Recharts standard arrays
    const colorsMap = {
      'Food & Drinks': '#a855f7',
      'Entertainment': '#ec4899',
      'Shopping': '#3b82f6',
      'Travel': '#6366f1',
      'Others': '#10b981'
    };

    const formattedPieData = Object.keys(categoryTotals).map(key => ({
      name: key,
      value: categoryTotals[key],
      color: colorsMap[key] || '#6b7280'
    })).filter(item => item.value > 0); // Exclude unspent category placeholders from chart slices

    // Sort and isolate top 3 burner merchants by absolute expenditure
    const topMerchants = Object.values(merchantMetrics)
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 3);

    // Identify single highest expense category target
    let topCategoryName = 'None';
    let maxCatVal = -1;
    Object.keys(categoryTotals).forEach(key => {
      if (categoryTotals[key] > maxCatVal && categoryTotals[key] > 0) {
        maxCatVal = categoryTotals[key];
        topCategoryName = key;
      }
    });

    return res.status(200).json({
      success: true,
      summary: {
        totalIncome,
        totalExpense,
        netSavingsMargin: totalIncome - totalExpense,
        topCategory: topCategoryName
      },
      pieData: formattedPieData,
      topMerchants
    });

  } catch (error) {
    console.error("Charts pipeline aggregation error:", error);
    return res.status(500).json({ success: false, message: 'Internal server aggregation framework fault.' });
  }
});

module.exports = router;