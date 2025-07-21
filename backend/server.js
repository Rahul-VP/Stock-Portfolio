require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const alertsRoutes = require('./routes/alerts');
const newsRoutes = require('./routes/news');

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/news', newsRoutes);

// Routes will be added here
app.get('/', (req, res) => {
  res.send('Stock Portfolio Tracker Backend');
}); 