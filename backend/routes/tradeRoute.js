const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeControllers');

router.get('/', tradeController.getTrades);
router.post('/', tradeController.createTrade);

module.exports = router;