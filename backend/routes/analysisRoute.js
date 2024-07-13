const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisControllers');

router.get('/', analysisController.getAnalysis);

module.exports = router;