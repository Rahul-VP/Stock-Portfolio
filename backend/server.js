require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Allowed frontend origins
const allowedOrigins = [
  'http://localhost:3000',                      // Local development
  'https://stock-portfolio-ten.vercel.app'      // Vercel frontend
];

// ✅ CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Body parser
app.use(express.json());

// ✅ Environment port fallback
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Import route modules
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const alertsRoutes = require('./routes/alerts');
const newsRoutes = require('./routes/news');

// ✅ Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/news', newsRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ Stock Portfolio Tracker Backend is running');
});
