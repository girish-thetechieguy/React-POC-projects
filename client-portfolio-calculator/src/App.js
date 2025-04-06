// src/App.js
import React, { useState } from 'react';
import ClientProfileCard from './components/ClientProfileCard';
import AssetAllocationChart from './components/AssetAllocationChart';
import InvestmentSimulator from './components/InvestmentSimulator';
import NetWorthCalculator from './components/NetWorthCalculator';
import './App.css';

const App = () => {
  const [netWorth, setNetWorth] = useState(100000); // Initial net worth
  const client = { name: 'John Doe', netWorth, strategy: 'Conservative' };

  const assetData = {
    labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash'],
    values: [50, 30, 15, 5],
  };

  const handleCalculate = (futureValue) => {
    setNetWorth(futureValue);
  };

  return (
    <div className="App">
      <h1>Client Portfolio Calculator</h1>
      <ClientProfileCard client={client} />
      <AssetAllocationChart data={assetData} />
      <InvestmentSimulator onCalculate={handleCalculate} />
      <NetWorthCalculator netWorth={netWorth} />
    </div>
  );
};

export default App;