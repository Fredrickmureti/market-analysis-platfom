const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  symbol: String,
  trend: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Analysis', analysisSchema);