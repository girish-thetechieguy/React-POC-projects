import React, { useState, useEffect } from 'react';
import AlertConfigurator from './components/AlertConfigurator/AlertConfigurator';
import MarketTicker from './components/MarketTicker/MarketTicker';
import AuditLog from './components/AuditLog/AuditLog';
import { AlertRule, AuditLogEntry, MarketData } from './types/types';
import './styles.css';

const App: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertRule[]>([]);
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [marketData, setMarketData] = useState<MarketData | null>(null);

  const availableSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];

  // Simulate WebSocket data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomSymbol = availableSymbols[Math.floor(Math.random() * availableSymbols.length)];
      const randomPrice = Math.random() * 1000;
      const randomChange = (Math.random() - 0.5) * 20;
      const randomChangePercent = (randomChange / randomPrice) * 100;
      
      const newMarketData: MarketData = {
        symbol: randomSymbol,
        price: randomPrice,
        change: randomChange,
        changePercent: randomChangePercent,
        timestamp: Date.now()
      };
      
      setMarketData(newMarketData);
      checkAlerts(newMarketData);
    }, 3000);

    return () => clearInterval(interval);
  }, [alerts]);

  const checkAlerts = (data: MarketData) => {
    alerts.forEach(alert => {
      if (alert.symbol === data.symbol && alert.active) {
        const isTriggered = alert.condition === 'above' 
          ? data.price >= alert.price 
          : data.price <= alert.price;
        
        if (isTriggered) {
          addLog({
            id: Date.now().toString(),
            timestamp: new Date(),
            eventType: 'ALERT_TRIGGERED',
            message: `Alert triggered for ${alert.symbol}`,
            data: {
              symbol: alert.symbol,
              price: data.price,
              alertRule: alert
            }
          });
          
          // Deactivate the alert after triggering
          setAlerts(prev => prev.map(a => 
            a.id === alert.id ? { ...a, active: false } : a
          ));
        }
      }
    });
  };

  const addLog = (log: AuditLogEntry) => {
    setLogs(prev => [log, ...prev].slice(0, 50)); // Keep last 50 entries
  };

  const handleAlertCreate = (alert: AlertRule) => {
    setAlerts(prev => [...prev, alert]);
    addLog({
      id: Date.now().toString(),
      timestamp: new Date(),
      eventType: 'ALERT_CREATED',
      message: `New alert created for ${alert.symbol}`,
      data: {
        alertRule: alert
      }
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Investment Alert System</h1>
      </header>
      <main className="app-main">
        <div className="app-column">
          <AlertConfigurator 
            onAlertCreate={handleAlertCreate} 
            symbols={availableSymbols} 
          />
          <MarketTicker />
        </div>
        <div className="app-column">
          <AuditLog logs={logs} />
        </div>
      </main>
    </div>
  );
};

export default App;