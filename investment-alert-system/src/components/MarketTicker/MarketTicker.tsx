import React from 'react';
import styles from './MarketTicker.module.css';
import { MarketData } from '../../types/types';
import { useWebSocket } from '../../hooks/useWebSocket';

const MarketTicker: React.FC = () => {
  const { data: marketData, isConnected } = useWebSocket('wss://streamer.finance.yahoo.com');
  
  const getChangeClass = (change: number) => {
    return change > 0 ? styles.positive : change < 0 ? styles.negative : styles.neutral;
  };

  return (
    <div className={styles.container}>
      <h2>Real-Time Market Data</h2>
      <div className={styles.connectionStatus}>
        Connection: {isConnected ? (
          <span className={styles.connected}>Connected</span>
        ) : (
          <span className={styles.disconnected}>Disconnected</span>
        )}
      </div>
      
      <div className={styles.ticker}>
        {marketData ? (
          <div className={styles.tickerItem}>
            <span className={styles.symbol}>{marketData.symbol}</span>
            <span className={styles.price}>${marketData.price.toFixed(2)}</span>
            <span className={`${styles.change} ${getChangeClass(marketData.change)}`}>
              {marketData.change > 0 ? '+' : ''}{marketData.change.toFixed(2)} (
              {marketData.changePercent.toFixed(2)}%)
            </span>
          </div>
        ) : (
          <div className={styles.loading}>Loading market data...</div>
        )}
      </div>
    </div>
  );
};

export default MarketTicker;