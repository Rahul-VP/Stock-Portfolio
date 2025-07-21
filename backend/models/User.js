const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  portfolio: [{
    symbol: String,
    quantity: Number,
    avgPrice: Number,
  }],
  alerts: [{
    symbol: String,
    targetPrice: Number,
    direction: { type: String, enum: ['above', 'below'] },
    triggered: { type: Boolean, default: false },
  }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema); 