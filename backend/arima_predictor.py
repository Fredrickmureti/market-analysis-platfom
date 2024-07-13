import sys
import json
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import warnings

def train_arima_model(data):
    with warnings.catch_warnings():
        warnings.filterwarnings("ignore")
        model = ARIMA(data, order=(5, 1, 0))
        model_fit = model.fit(disp=0)
    return model_fit

def main():
    input_data = json.loads(sys.stdin.read())
    prices = input_data['prices']
    data = pd.Series(prices)
    
    if len(data) < 30:
        print(json.dumps({"error": "Too few observations to estimate ARIMA model parameters. Please provide at least 30 data points."}))
        return
    
    model_fit = train_arima_model(data)
    forecast = model_fit.forecast(steps=5)
    
    result = forecast.tolist()
    print(json.dumps(result))

if __name__ == "__main__":
    main()