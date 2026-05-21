
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allows your React app to connect
app.use(express.json()); // Parses incoming json requests

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🚀 Connected to MongoDB Atlas Cloud Database successfully.'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error occurred.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`📡 Authentication engine active on port ${PORT}`);
});