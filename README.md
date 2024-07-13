````markdown
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

### Clone the Repository

```bash
git clone https://github.com/yourusername/mt-trading-bot.git
cd mt-trading-bot
```
````

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Create and activate a Python virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Python dependencies:**

   ```bash
   pip install pandas numpy statsmodels
   ```

4. **Install Node.js dependencies:**

   ```bash
   npm install
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install Node.js dependencies:**

   ```bash
   npm install
   ```

### Configuration

1. **API Keys:**

   Update the `backend/config.js` file with your MetalPriceAPI key:

   ```javascript
   module.exports = {
     mongoURI: "your_mongodb_uri",
     metalPriceApiKey: "your_metalpriceapi_key", // Replace with your actual API key
   };
   ```

### Running the Application

1. **Start the Python Virtual Environment:**

   ```bash
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. **Start the Backend Server:**

   ```bash
   cd backend
   npm run dev
   ```

3. **Start the Frontend Server:**

   ```bash
   cd frontend
   npm run dev
   ```

## Usage

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard. Use the controls to select the base currency, target currencies, interval, account size, and risk percentage. The dashboard will display real-time market data, analysis, and predictions.

LINK TO THE LIVE DEMO [https://market-analysis-platfom-front-j0wmmqjr5.vercel.app/](https://market-analysis-platfom-front-j0wmmqjr5.vercel.app)

```

```
