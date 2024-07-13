const Trade = require('../models/Trade');

exports.getTrades = async (req, res) => {
  try {
    const trades = await Trade.find();
    res.json(trades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTrade = async (req, res) => {
  const trade = new Trade(req.body);
  try {
    const newTrade = await trade.save();
    res.status(201).json(newTrade);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};