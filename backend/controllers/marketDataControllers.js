const marketDataService = require('../services/marketDataService');
const analysisService = require('../services/analysisService');
const predictionService = require('../services/preditionService');

exports.getMarketData = async (req, res) => {
  const { base, currencies, interval, accountSize, riskPercentage } = req.query;
  try {
    const data = await marketDataService.getMarketData(base, currencies);
    const analysis = analysisService.analyzeMarketData(data);
    const tpPips = analysisService.calculateTP(accountSize, riskPercentage);

    // Get close prices for prediction
    const closePrices = Object.values(data.rates);
    const predictions = await predictionService.getPredictions(closePrices);

    res.json({
      data,
      analysis,
      tpPips,
      predictions,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching market data:', error.message || error);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Error fetching market data:', error);
      res.status(500).json({ message: error.message || 'An unknown error occurred' });
    }
  }
};