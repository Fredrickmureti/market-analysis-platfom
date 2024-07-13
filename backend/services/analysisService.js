const calculateSMA = (closePrices, period) => {
    const sma = [];
    for (let i = 0; i <= closePrices.length - period; i++) {
        const slice = closePrices.slice(i, i + period);
        const sum = slice.reduce((acc, val) => acc + val, 0);
        sma.push(sum / period);
    }
    return sma;
};

const calculateEMA = (closePrices, period) => {
    const k = 2 / (period + 1);
    const ema = [closePrices[0]];

    for (let i = 1; i < closePrices.length; i++) {
        ema.push(closePrices[i] * k + ema[i - 1] * (1 - k));
    }

    return ema;
};

const calculateRSI = (closePrices, period = 14) => {
    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i++) {
        const change = closePrices[i] - closePrices[i - 1];
        if (change > 0) {
            gains += change;
        } else {
            losses -= change;
        }
    }

    const averageGain = gains / period;
    const averageLoss = losses / period;
    const rs = averageGain / averageLoss;
    const rsi = 100 - (100 / (1 + rs));

    return rsi;
};

const calculateBollingerBands = (closePrices, period = 20, multiplier = 2) => {
    const sma = calculateSMA(closePrices, period);
    const bands = [];

    for (let i = 0; i < sma.length; i++) {
        const slice = closePrices.slice(i, i + period);
        const stdDev = Math.sqrt(slice.reduce((acc, val) => acc + Math.pow(val - sma[i], 2), 0) / period);
        bands.push({
            upper: sma[i] + multiplier * stdDev,
            lower: sma[i] - multiplier * stdDev,
        });
    }

    return bands;
};

const analyzeMarketData = (data) => {
    const closePrices = Object.values(data.rates);
    const smaShort = calculateSMA(closePrices, 5); // 5-period SMA
    const smaLong = calculateSMA(closePrices, 20); // 20-period SMA
    const emaShort = calculateEMA(closePrices, 5); // 5-period EMA
    const emaLong = calculateEMA(closePrices, 20); // 20-period EMA
    const rsi = calculateRSI(closePrices); // 14-period RSI
    const bollingerBands = calculateBollingerBands(closePrices); // 20-period Bollinger Bands

    const latestSMA5 = smaShort[smaShort.length - 1];
    const latestSMA20 = smaLong[smaLong.length - 1];
    const latestEMA5 = emaShort[emaShort.length - 1];
    const latestEMA20 = emaLong[emaLong.length - 1];
    const latestRSI = rsi;
    const latestBollingerBands = bollingerBands[bollingerBands.length - 1];

    let prediction = 'neutral';
    let entryPoint = null;
    let exitPoint = null;

    // Simple trend analysis
    if (latestSMA5 > latestSMA20 && latestEMA5 > latestEMA20 && latestRSI < 70) {
        prediction = 'long';
        entryPoint = closePrices[closePrices.length - 1];
        exitPoint = entryPoint + (latestSMA5 - latestSMA20);
    } else if (latestSMA5 < latestSMA20 && latestEMA5 < latestEMA20 && latestRSI > 30) {
        prediction = 'short';
        entryPoint = closePrices[closePrices.length - 1];
        exitPoint = entryPoint - (latestSMA20 - latestSMA5);
    }

    const highestPrice = Math.max(...closePrices);
    const lowestPrice = Math.min(...closePrices);
    const currentPrice = closePrices[closePrices.length - 1];

    return {
        prediction,
        latestSMA5,
        latestSMA20,
        latestEMA5,
        latestEMA20,
        latestRSI,
        latestBollingerBands,
        entryPoint,
        exitPoint,
        highestPrice,
        lowestPrice,
        currentPrice,
    };
};

const calculateTP = (accountSize, riskPercentage) => {
    const riskAmount = accountSize * (riskPercentage / 100);
    // Assuming a fixed pip value for simplicity
    const pipValue = 10; // $10 per pip
    const tpPips = riskAmount / pipValue;
    return tpPips;
};

module.exports = {
    analyzeMarketData,
    calculateTP,
};