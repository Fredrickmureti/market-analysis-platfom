const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  symbol: String,
  action: String,
  price: Number,
  volume: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trade', tradeSchema);