const axios = require('axios');
const config = require('../config');

const API_KEY = config.metalPriceApiKey;

const getMarketData = async (base, currencies) => {
  const url = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=${base}&currencies=${currencies}`;
  try {
    const response = await axios.get(url);

    // Check if data is available
    if (!response.data || !response.data.rates) {
      throw new Error('No data available for the given base and currencies');
    }

    const data = response.data;
    return data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Error fetching market data: Unauthorized - Invalid API key');
      throw new Error('Unauthorized - Invalid API key');
    } else {
      console.error('Error fetching market data:', error.message); // Log the error message
      throw error;
    }
  }
};

module.exports = {
  getMarketData,
};