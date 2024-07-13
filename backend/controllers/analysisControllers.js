const Analysis = require('../models/Analysis');

exports.getAnalysis = async (req, res) => {
    try {
        const analysis = await Analysis.find();
        res.json(analysis);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};