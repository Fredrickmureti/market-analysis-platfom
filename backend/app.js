const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const tradeRoutes = require('./routes/tradeRoute');
const analysisRoutes = require('./routes/analysisRoute');
const marketDataRoutes = require('./routes/marketDataRoutes');
const cors = require('cors');

const app = express();

// configure CORS
app.use(cors({
	origin: "https://market-analysis-platfom-front-end.vercel.app',
	methods: ['GET', 'POST', 'DELETE']
}));
app.use(express.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/trades', tradeRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/market-data', marketDataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
