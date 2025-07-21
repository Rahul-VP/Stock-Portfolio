const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getPortfolio, addStock, removeStock } = require('../controllers/portfolioController');
const PortfolioHistory = require('../models/PortfolioHistory');

// Portfolio routes will be added here
router.get('/', auth, getPortfolio);
router.post('/add', auth, addStock);
router.post('/remove', auth, removeStock);
router.get('/history', auth, async (req, res) => {
  try {
    const history = await PortfolioHistory.find({ user: req.user.id }).sort({ date: 1 });
    res.json(history);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router; 