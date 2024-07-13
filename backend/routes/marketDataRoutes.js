const express = require('express');
const router = express.Router();
const marketDataController = require('../controllers/marketDataControllers');

router.get('/', marketDataController.getMarketData);

module.exports = router;