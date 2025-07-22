require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();

// ✅ Allowed frontend origins
const allowedOrigins = [
  'http://localhost:3000', // Local dev
  'https://stock-portfolio-ten.vercel.app' // Deployed frontend
];

// ✅ CORS config middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// ✅ Use CORS with options
app.use(cors(corsOptions));

// ✅ Handle OPTIONS preflight for all routes
app.options('*', cors(corsOptions));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Debug logger (optional)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// ✅ Connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// ✅ Import and use routes
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const alertsRoutes = require('./routes/alerts');
const newsRoutes = require('./routes/news');

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/news', newsRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.send('✅ Stock Portfolio Tracker Backend is running');
});
