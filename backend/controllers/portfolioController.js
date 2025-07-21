const User = require('../models/User');
const { getStockQuote } = require('../utils/finnhub');
const PortfolioHistory = require('../models/PortfolioHistory');

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

exports.getPortfolio = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    // Fetch latest prices for each holding
    const portfolioWithPrices = await Promise.all(user.portfolio.map(async (item) => {
      const quote = await getStockQuote(item.symbol);
      let price = 0;
      if (quote && typeof quote.c === 'number' && quote.c > 0) {
        price = quote.c;
      } else {
        console.warn(`No price found for symbol: ${item.symbol}`, quote);
        price = item.avgPrice; // fallback to avgPrice or 0
      }
      const gainLoss = ((price - item.avgPrice) * item.quantity).toFixed(2);
      return {
        ...item._doc,
        currentPrice: price,
        gainLoss,
      };
    }));
    // Save daily snapshot
    const totalValue = portfolioWithPrices.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
    const today = new Date().toISOString().slice(0, 10);
    await PortfolioHistory.findOneAndUpdate(
      { user: req.user.id, date: today },
      { value: totalValue },
      { upsert: true, new: true }
    );
    res.json({ portfolio: portfolioWithPrices });
  } catch (err) {
    console.error('Portfolio error:', err);
    res.status(500).send('Server error');
  }
};

exports.addStock = async (req, res) => {
  const { symbol, quantity, avgPrice } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    // Check if stock already exists
    const existing = user.portfolio.find(item => item.symbol === symbol);
    if (existing) return res.status(400).json({ msg: 'Stock already in portfolio' });
    user.portfolio.push({ symbol, quantity, avgPrice });
    await user.save();
    res.json({ msg: 'Stock added', portfolio: user.portfolio });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.removeStock = async (req, res) => {
  const { symbol } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    user.portfolio = user.portfolio.filter(item => item.symbol !== symbol);
    await user.save();
    res.json({ msg: 'Stock removed', portfolio: user.portfolio });
  } catch (err) {
    res.status(500).send('Server error');
  }
}; 