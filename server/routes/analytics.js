const express = require('express');
const router = express.Router();
const authGuard = require('../middleware/authGuard');
const Expense = require('../models/Expense');
const User = require('../models/User');

router.get('/dashboard', authGuard, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userProfile = await User.findById(userId);
    if (!userProfile) return res.status(404).json({ success: false, message: 'User profile not found.' });

    const expenses = await Expense.find({ userId, transaction_type: 'expense' }).sort({ timestamp: 1 });
    const incomes = await Expense.find({ userId, transaction_type: 'income' });

    let totalSpent = expenses.reduce((sum, tx) => sum + tx.amount, 0);
    let totalIncome = incomes.reduce((sum, tx) => sum + tx.amount, 0);

    // 1. ADVANCED WEEKEND SPENDING ANALYSIS
    let weekendSpend = 0;
    let weekdaySpend = 0;

    expenses.forEach(tx => {
      const day = new Date(tx.timestamp).getDay();
      if (day === 0 || day === 6) { // 0 = Sunday, 6 = Saturday
        weekendSpend += tx.amount;
      } else {
        weekdaySpend += tx.amount;
      }
    });

    let weekendInsightMessage = "Your weekend spending habits conform perfectly to your standard weekday run rate.";
    if (weekdaySpend > 0 && weekendSpend > 0) {
      const percentageDifference = Math.round(((weekendSpend - weekdaySpend) / weekdaySpend) * 100);
      if (percentageDifference > 0) {
        weekendInsightMessage = `AI Insight: Your weekend lifestyle expenditures are running ${percentageDifference}% higher than your baseline weekday metrics.`;
      } else if (percentageDifference < 0) {
        weekendInsightMessage = `AI Insight: Your weekend spending velocity runs ${Math.abs(percentageDifference)}% lower than routine weekday channels.`;
      }
    }

    // 2. DYNAMIC LIQUID RUNWAY ESTIMATES
    let avgDailyBurn = 0;
    let runwayDays = 'Infinite';
    if (expenses.length > 0) {
      const firstDate = new Date(expenses[0].timestamp);
      const totalDaysWindow = Math.max(Math.ceil((new Date() - firstDate) / (1000 * 60 * 60 * 24)), 1);
      avgDailyBurn = Math.round(totalSpent / totalDaysWindow);
      if (avgDailyBurn > 0 && userProfile.total_balance > 0) {
        runwayDays = Math.max(Math.floor(userProfile.total_balance / avgDailyBurn), 0);
      }
    }

    // 3. CLEAN 6-MONTH CASH FLOW TEMPLATE
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const flowMap = {};
    for (let i = 5; i >= 0; i--) {
      const targetMonth = months[new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).getMonth()];
      flowMap[targetMonth] = { month: targetMonth, Income: 0, Expense: 0 };
    }

    incomes.forEach(tx => {
      const m = months[new Date(tx.timestamp).getMonth()];
      if (flowMap[m]) flowMap[m].Income += tx.amount;
    });
    expenses.forEach(tx => {
      const m = months[new Date(tx.timestamp).getMonth()];
      if (flowMap[m]) flowMap[m].Expense += tx.amount;
    });

    // 4. CATEGORICAL DISTRIBUTION PIPELINE
    const categoryTotals = { 'Food & Drinks': 0, 'Entertainment': 0, 'Shopping': 0, 'Travel': 0, 'Others': 0 };
    expenses.forEach(tx => {
      if (categoryTotals[tx.category] !== undefined) categoryTotals[tx.category] += tx.amount;
      else categoryTotals['Others'] += tx.amount;
    });

    const categoriesList = Object.keys(categoryTotals).map(key => ({
      name: key,
      spent: categoryTotals[key]
    }));

    const topCat = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b, 'Others');

    // 5. RULE-BASED TREND COGNITION NOTIFICATIONS
    const activeInsights = [
      { type: 'insight', title: 'AI Balance Insight', message: weekendInsightMessage }
    ];

    // Fixed Alert Threshold Logic: Compares your real expenditures against your assigned monthly cap ceiling
    if (totalSpent > userProfile.monthly_cap) {
      activeInsights.push({
        type: 'alert',
        title: 'Critical Budget Alert',
        message: `Warning: Total expenditures (₹${totalSpent}) have broken past your allocated limit ceiling of ₹${userProfile.monthly_cap}. Limit discretionary outlays.`
      });
    } else {
      const safetyMargin = Math.round(((userProfile.monthly_cap - totalSpent) / userProfile.monthly_cap) * 100);
      activeInsights.push({
        type: 'alert',
        title: 'Velocity Safety Cushion',
        message: `Your accounts preserve a secure ${safetyMargin}% target capital buffer beneath your designated monthly ceiling cap.`
      });
    }

    return res.status(200).json({
      success: true,
      cards: { totalSpent, avgDaily: avgDailyBurn, topCategory: totalSpent > 0 ? topCat : 'None', runwayDays },
      cashFlow: Object.values(flowMap),
      distribution: categoriesList,
      insights: activeInsights
    });
  } catch (error) {
    console.error("Analytics pipeline crash:", error);
    res.status(500).json({ success: false, message: 'Internal Server Fault.' });
  }
});

module.exports = router;