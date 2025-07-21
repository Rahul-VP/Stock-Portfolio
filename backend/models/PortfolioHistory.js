const mongoose = require('mongoose');

const PortfolioHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  value: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('PortfolioHistory', PortfolioHistorySchema); 