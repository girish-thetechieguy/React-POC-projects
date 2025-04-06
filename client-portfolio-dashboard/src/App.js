import React from 'react';
import ClientProfileCard from './components/ClientProfileCard';
import NetWorthCalculator from './components/NetWorthCalculator';
import AssetAllocationChart from './components/AssetAllocationChart';
import WhatIfSimulator from './components/WhatIfSimulator';
import './index.css';

const App = () => {
  const clientData = {
    name: 'John Smith',
    age: 42,
    riskTolerance: 'Moderate',
    portfolioValue: 275000
  };

  const allocationData = {
    stocks: 60,
    bonds: 30,
    cash: 10
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Client Portfolio Dashboard</h1>
      </header>
      <main>
        <div className="row">
          <ClientProfileCard client={clientData} />
          <NetWorthCalculator />
        </div>
        <div className="row">
          <AssetAllocationChart data={allocationData} />
          <WhatIfSimulator />
        </div>
      </main>
    </div>
  );
};

export default App;