import React, { useState } from 'react';
import styles from './AlertConfigurator.module.css';
import { AlertRule } from '../../types/types';

interface AlertConfiguratorProps {
  onAlertCreate: (alert: AlertRule) => void;
  symbols: string[];
}

const AlertConfigurator: React.FC<AlertConfiguratorProps> = ({ onAlertCreate, symbols }) => {
  const [symbol, setSymbol] = useState<string>(symbols[0]);
  const [price, setPrice] = useState<string>('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: AlertRule = {
      id: Date.now().toString(),
      symbol,
      condition,
      price: parseFloat(price),
      active: true
    };
    onAlertCreate(newAlert);
    setPrice('');
  };

  return (
    <div className={styles.container}>
      <h2>Create Price Alert</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="symbol">Asset Symbol:</label>
          <select
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className={styles.select}
          >
            {symbols.map((sym) => (
              <option key={sym} value={sym}>
                {sym}
              </option>
            ))}
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="condition">Condition:</label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value as 'above' | 'below')}
            className={styles.select}
          >
            <option value="above">Price Above</option>
            <option value="below">Price Below</option>
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="price">Price Threshold:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        
        <button type="submit" className={styles.button}>
          Create Alert
        </button>
      </form>
    </div>
  );
};

export default AlertConfigurator;