import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Dashboard.css';

interface MarketData {
    base: string;
    rates: {
        [key: string]: number;
    };
}

interface Analysis {
    prediction: string;
    latestSMA5: number;
    latestSMA20: number;
    latestEMA5: number;
    latestEMA20: number;
    latestRSI: number;
    latestBollingerBands: {
        upper: number;
        lower: number;
    };
    entryPoint: number;
    exitPoint: number;
    highestPrice: number;
    lowestPrice: number;
    currentPrice: number;
}

const Dashboard: React.FC = () => {
    const [marketData, setMarketData] = useState<MarketData | null>(null);
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [tpPips, setTpPips] = useState<number | null>(null);
    const [predictions, setPredictions] = useState<number[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [base, setBase] = useState<string>('USD');
    const [currencies, setCurrencies] = useState<string>('EUR,XAU,XAG');
    const [interval, setInterval] = useState<string>('1');
    const [accountSize, setAccountSize] = useState<number>(10000);
    const [riskPercentage, setRiskPercentage] = useState<number>(1);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const response = await api.get('/market-data', {
                    params: { base, currencies, interval, accountSize, riskPercentage },
                });
                setMarketData(response.data.data);
                setAnalysis(response.data.analysis);
                setTpPips(response.data.tpPips);
                setPredictions(response.data.predictions);
                setError(null);
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching market data:', error.message);
                    setError(error.message);
                } else {
                    console.error('Error fetching market data:', error);
                    setError('An unknown error occurred');
                }
            }
        };

        fetchMarketData();
    }, [base, currencies, interval, accountSize, riskPercentage]);

    return (
        <div className="dashboard">
            <h1>Market Data Dashboard</h1>
            <div className="controls">
                <label>
                    Base Currency:
                    <select value={base} onChange={(e) => setBase(e.target.value)}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="JPY">JPY</option>
                    </select>
                </label>
                <label>
                    Currencies:
                    <input
                        type="text"
                        value={currencies}
                        onChange={(e) => setCurrencies(e.target.value)}
                    />
                </label>
                <label>
                    Interval:
                    <select value={interval} onChange={(e) => setInterval(e.target.value)}>
                        <option value="1">1 Minute</option>
                        <option value="5">5 Minutes</option>
                        <option value="15">15 Minutes</option>
                        <option value="30">30 Minutes</option>
                        <option value="60">1 Hour</option>
                    </select>
                </label>
                <label>
                    Account Size:
                    <input
                        type="number"
                        value={accountSize}
                        onChange={(e) => setAccountSize(Number(e.target.value))}
                    />
                </label>
                <label>
                    Risk Percentage:
                    <input
                        type="number"
                        value={riskPercentage}
                        onChange={(e) => setRiskPercentage(Number(e.target.value))}
                    />
                </label>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="market-data-container">
                {marketData ? (
                    <ul className="market-data-list">
                        {Object.entries(marketData.rates).map(([currency, rate]) => (
                            <li key={currency} className="market-data-item">
                                <span>{currency}</span>
                                <span>Rate: {rate}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading market data...</p>
                )}
            </div>
            {analysis && (
                <div className="analysis">
                    <h2>Analysis</h2>
                    <p>Prediction: {analysis.prediction}</p>
                    <p>Latest 5-Period SMA: {analysis.latestSMA5}</p>
                    <p>Latest 20-Period SMA: {analysis.latestSMA20}</p>
                    <p>Latest 5-Period EMA: {analysis.latestEMA5}</p>
                    <p>Latest 20-Period EMA: {analysis.latestEMA20}</p>
                    <p>RSI: {analysis.latestRSI}</p>
                    {analysis.latestBollingerBands && (
                        <p>Bollinger Bands: Upper - {analysis.latestBollingerBands.upper}, Lower - {analysis.latestBollingerBands.lower}</p>
                    )}
                    <p>Highest Price: {analysis.highestPrice}</p>
                    <p>Lowest Price: {analysis.lowestPrice}</p>
                    <p>Current Price: {analysis.currentPrice}</p>
                    <p>Suggested Take Profit (TP): {tpPips} pips</p>
                    <p>Entry Point: {analysis.entryPoint}</p>
                    <p>Exit Point: {analysis.exitPoint}</p>
                </div>
            )}
            {predictions && (
                <div className="predictions">
                    <h2>Predictions</h2>
                    <ul>
                        {predictions.map((prediction, index) => (
                            <li key={index}>Prediction {index + 1}: {prediction}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;