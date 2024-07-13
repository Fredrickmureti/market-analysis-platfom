import sys
import os
import time

# Add the parent directory to the sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.services.mt5Service import initialize_mt5, get_market_data, place_trade
from backend.services.analysisService import analyzeMarket

initialize_mt5()

while True:
    market_data = get_market_data('EURUSD')
    trend = analyzeMarket(market_data)
    
    if trend == 'uptrend':
        place_trade('EURUSD', 'buy', 0.1)
    elif trend == 'downtrend':
        place_trade('EURUSD', 'sell', 0.1)

    time.sleep(60)  # Run every minute