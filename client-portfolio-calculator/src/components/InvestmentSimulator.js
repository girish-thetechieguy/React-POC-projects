// src/components/InvestmentSimulator.js
import React, { useState } from 'react';

const InvestmentSimulator = ({ onCalculate }) => {
  const [investment, setInvestment] = useState(0);
  const [years, setYears] = useState(1);
  const [rate, setRate] = useState(5);

  const handleCalculate = () => {
    const futureValue = investment * Math.pow(1 + rate / 100, years);
    onCalculate(futureValue);
  };

  return (
    <div>
      <h3>What-If Investment Simulator</h3>
      <input type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} placeholder="Investment Amount" />
      <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="Years" />
      <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Annual Rate (%)" />
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
};

export default InvestmentSimulator;