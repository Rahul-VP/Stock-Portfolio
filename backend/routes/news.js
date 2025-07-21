const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getStockNews, searchSymbols } = require('../utils/finnhub');

router.get('/:symbol', auth, async (req, res) => {
  try {
    const news = await getStockNews(req.params.symbol);
    res.json(news);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/search/:query', auth, async (req, res) => {
  try {
    const results = await searchSymbols(req.params.query);
    res.json(results);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router; 