import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-market-analysis.vercel.app',
});

export default api;