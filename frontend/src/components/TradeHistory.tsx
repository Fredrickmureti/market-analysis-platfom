import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './TradeHistory.css';

const TradeHistory: React.FC = () => {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        const fetchTrades = async () => {
            const response = await api.get('/trades');
            setTrades(response.data);
        };

        fetchTrades();
    }, []);

    return (
        <div className="trade-history">
            <h1>Trade History</h1>
            <ul className="trade-list">
                {trades.map(trade => (
                    <li key={trade._id} className="trade-item">
                        <span>{trade.symbol}</span>
                        <span>{trade.action}</span>
                        <span>{trade.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TradeHistory;