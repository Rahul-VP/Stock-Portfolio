const User = require('../models/User');
const { getStockQuote } = require('../utils/alphaVantage');

exports.getAlerts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ alerts: user.alerts });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.addAlert = async (req, res) => {
  const { symbol, targetPrice, direction } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    user.alerts.push({ symbol, targetPrice, direction });
    await user.save();
    res.json({ msg: 'Alert added', alerts: user.alerts });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.removeAlert = async (req, res) => {
  const { symbol, targetPrice, direction } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    user.alerts = user.alerts.filter(alert => !(alert.symbol === symbol && alert.targetPrice === targetPrice && alert.direction === direction));
    await user.save();
    res.json({ msg: 'Alert removed', alerts: user.alerts });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.checkAlerts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    let triggeredAlerts = [];
    for (let alert of user.alerts) {
      if (alert.triggered) continue;
      const quote = await getStockQuote(alert.symbol);
      const price = parseFloat(quote['05. price'] || 0);
      if (
        (alert.direction === 'above' && price > alert.targetPrice) ||
        (alert.direction === 'below' && price < alert.targetPrice)
      ) {
        alert.triggered = true;
        triggeredAlerts.push({ ...alert._doc, currentPrice: price });
      }
    }
    await user.save();
    res.json({ triggered: triggeredAlerts });
  } catch (err) {
    res.status(500).send('Server error');
  }
}; 