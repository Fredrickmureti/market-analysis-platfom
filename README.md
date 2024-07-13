# Trading Bot with Machine Learning Predictions

This project is a trading bot application that fetches real-time market data, performs analysis, and makes predictions using machine learning models. The application is built using Node.js for the backend, React for the frontend, and Python for the machine learning model.

## Features

- Fetches real-time market data from MetalPriceAPI
- Analyzes market data using technical analysis methods (SMA, EMA, RSI, Bollinger Bands)
- Makes predictions using an ARIMA model implemented in Python
- Displays market data, analysis, and predictions on a beautiful and responsive frontend

## Requirements

- Node.js
- Python 3.x
- MetalPriceAPI API Key

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/mt-trading-bot.git
   cd mt-trading-bot
   Backend Setup:
   ```

Navigate to the backend directory:

cd backend
Create and activate a Python virtual environment:

python -m venv venv
source venv/bin/activate # On Windows use `venv\Scripts\activate`
Install Python dependencies:

pip install pandas numpy statsmodels
Install Node.js dependencies:

npm install
Frontend Setup:

Navigate to the frontend directory:

cd ../frontend
Install Node.js dependencies:

npm install
Configuration
API Keys:

Update the backend/config.js file with your MetalPriceAPI key:

module.exports = {
mongoURI: 'your_mongodb_uri',
metalPriceApiKey: 'your_metalpriceapi_key', // Replace with your actual API key
};
Running the Application
Start the Python Virtual Environment:

source venv/bin/activate # On Windows use `venv\Scripts\activate`
Start the Backend Server:

cd backend
npm run dev
Start the Frontend Server:

cd frontend
npm run dev
Usage
Open your browser and navigate to http://localhost:3000 to view the dashboard.
Use the controls to select the base currency, target currencies, interval, account size, and risk percentage.
The dashboard will display real-time market data, analysis, and predictions.
