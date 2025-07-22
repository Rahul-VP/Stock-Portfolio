require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Define allowed frontend origins (adjust these as needed)
const allowedOrigins = [
  'http://localhost:3000',                      // Local development
  'https://stock-portfolio-ten.vercel.app'      // Your deployed frontend
];

// ✅ Apply CORS with proper settings
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Route Imports
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const alertsRoutes = require('./routes/alerts');
const newsRoutes = require('./routes/news');

// ✅ Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/news', newsRoutes);

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('✅ Stock Portfolio Tracker Backend is running');
});
