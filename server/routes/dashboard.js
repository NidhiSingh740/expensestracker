const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const authGuard = require('../middleware/authGuard');
const User = require('../models/User');
const Expense = require('../models/Expense');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateWithRetry(ai, config, maxRetries = 3) {
  const MODELS = ['gemini-2.5-flash', 'gemini-1.5-flash'];
  for (const model of MODELS) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({ ...config, model });
        return response;
      } catch (err) {
        const isRetryable = err.status === 503 || err.status === 429;
        if (!isRetryable || (attempt === maxRetries - 1 && model === MODELS[MODELS.length - 1])) throw err;
        if (attempt === maxRetries - 1) break;
        const delay = 1000 * Math.pow(2, attempt);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
}

// 1. GET DASHBOARD REAL-TIME PERSISTENT SUMMARY
router.get('/summary', authGuard, async (req, res) => {
  try {
    const userProfile = await User.findById(req.user.userId);
    if (!userProfile) return res.status(404).json({ success: false, message: 'User not found' });

    const history = await Expense.find({ userId: req.user.userId }).sort({ timestamp: -1 });

    let totalSpent = 0;
    // Initializing all valid enum streams + Others category to handle catch-alls smoothly
    const categoryTotals = { 'Food & Drinks': 0, 'Entertainment': 0, 'Shopping': 0, 'Travel': 0, 'Income': 0, 'Others': 0 };
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = dayNames[d.getDay()];
      weeklyMap[label] = 0;
    }

    history.forEach(tx => {
      if (tx.transaction_type === 'expense') {
        totalSpent += tx.amount;
        if (categoryTotals[tx.category] !== undefined) {
          categoryTotals[tx.category] += tx.amount;
        } else {
          categoryTotals['Others'] += tx.amount;
        }

        const txLabel = dayNames[new Date(tx.timestamp).getDay()];
        if (weeklyMap[txLabel] !== undefined) {
          weeklyMap[txLabel] += tx.amount;
        }
      }
    });

    const formattedGraphData = Object.keys(weeklyMap).map(day => ({
      name: day,
      Spent: weeklyMap[day],
      BudgetLimit: Math.round(userProfile.monthly_cap / 7) // Adjusted visual safety threshhold baseline per day
    }));

    return res.status(200).json({
      success: true,
      balance: userProfile.total_balance,
      monthlyCap: userProfile.monthly_cap,
      totalSpent,
      graphData: formattedGraphData,
      categoryData: categoryTotals,
      recentActivities: history.slice(0, 5)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error compiling data maps.' });
  }
});

// 2. POST MANUAL PROFILE BALANCE UPDATE MODIFIER
router.post('/update-balance', authGuard, async (req, res) => {
  try {
    const { balance, monthlyCap } = req.body;
    const userProfile = await User.findById(req.user.userId);
    if (!userProfile) return res.status(404).json({ success: false, message: 'User not found' });

    if (balance !== undefined) userProfile.total_balance = Number(balance);
    if (monthlyCap !== undefined) userProfile.monthly_cap = Number(monthlyCap);

    await userProfile.save();
    return res.status(200).json({ 
      success: true, 
      message: 'Profile account limits updated successfully!', 
      balance: userProfile.total_balance, 
      monthlyCap: userProfile.monthly_cap 
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to rewrite data profiles.' });
  }
});

// 3. AI INPUT PROCESS STREAM ENGINE ROUTE (With generateWithRetry)
router.post('/process-input', authGuard, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, message: 'Input text stream cannot be empty.' });

    const systemPrompt = `You are an expert personal finance parsing engine. Extract transaction parameters. Output raw valid JSON only.`;

    const aiResponse = await generateWithRetry(ai, {
      contents: `Process this transaction phrase: "${text}"`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.1,
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            merchant_name: { type: 'STRING' },
            amount: { type: 'NUMBER' },
            category: { type: 'STRING', enum: ['Food & Drinks', 'Entertainment', 'Shopping', 'Travel', 'Income', 'Others'] },
            transaction_type: { type: 'STRING', enum: ['expense', 'income'] }
          },
          required: ['merchant_name', 'amount', 'category', 'transaction_type']
        }
      }
    });

    const extractedData = JSON.parse(aiResponse.text.trim());
    const userProfile = await User.findById(req.user.userId);

    if (extractedData.transaction_type === 'expense') {
      userProfile.total_balance -= extractedData.amount;
    } else if (extractedData.transaction_type === 'income') {
      userProfile.total_balance += extractedData.amount;
    }

    await userProfile.save();

    const loggedTransaction = new Expense({
      userId: userProfile._id,
      merchant_name: extractedData.merchant_name,
      amount: extractedData.amount,
      category: extractedData.category,
      transaction_type: extractedData.transaction_type
    });

    await loggedTransaction.save();

    return res.status(200).json({
      success: true,
      newBalance: userProfile.total_balance,
      extracted: extractedData
    });
  } catch (error) {
    console.error(error);
    const isOverload = error.status === 503;
    const isRateLimit = error.status === 429;
    return res.status(isOverload || isRateLimit ? 503 : 500).json({
      success: false,
      message: isOverload ? 'AI model overloaded.' : isRateLimit ? 'Rate limited.' : 'Parser fault.'
    });
  }
});

module.exports = router;