import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Analysis.css';

const Analysis: React.FC = () => {
    const [analysis, setAnalysis] = useState([]);

    useEffect(() => {
        const fetchAnalysis = async () => {
            const response = await api.get('/analysis');
            setAnalysis(response.data);
        };

        fetchAnalysis();
    }, []);

    return (
        <div className="analysis">
            <h1>Market Analysis</h1>
            <ul className="analysis-list">
                {analysis.map(item => (
                    <li key={item} className="analysis-item">
                        <span>{item}</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Analysis;