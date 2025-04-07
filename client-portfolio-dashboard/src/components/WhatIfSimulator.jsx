import React, { useState } from 'react';
import '../index.css';

const WhatIfSimulator = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [years, setYears] = useState(10);
  const [contributionFrequency, setContributionFrequency] = useState('monthly');

  const calculateProjection = () => {
    const periods = years;
    const rate = annualReturn / 100;
    let futureValue = initialInvestment * Math.pow(1 + rate, periods);
    
    if (monthlyContribution > 0) {
      if (contributionFrequency === 'monthly') {
        const monthlyRate = rate / 12;
        const totalPayments = periods * 12;
        futureValue += monthlyContribution * 
          ((Math.pow(1 + monthlyRate, totalPayments) - 1) / monthlyRate) * 
          (1 + monthlyRate);
      } else { // annual
        futureValue += monthlyContribution * 12 * 
          ((Math.pow(1 + rate, periods) - 1) )/ rate;
      }
    }
    
    return futureValue;
  };

  const resetValues = () => {
    setInitialInvestment(10000);
    setMonthlyContribution(0);
    setAnnualReturn(7);
    setYears(10);
    setContributionFrequency('monthly');
  };

  const projectedValue = calculateProjection();

  return (
    <div className="simulator">
      <h3>What-If Investment Simulator</h3>
      <div className="input-group">
        <label>
          Initial Investment:
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(parseFloat(e.target.value) || 0)}
            min="0"
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Monthly Contribution:
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
            min="0"
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Contribution Frequency:
          <select
            value={contributionFrequency}
            onChange={(e) => setContributionFrequency(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
        </label>
      </div>
      <div className="input-group">
        <label>
          Annual Return (%):
          <input
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(parseFloat(e.target.value) || 0)}
            step="0.1"
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Years:
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(parseFloat(e.target.value) || 0)}
            min="1"
            max="50"
          />
        </label>
      </div>
      <div className="result">
        <h4>Projected Value: ${projectedValue.toLocaleString(undefined, {maximumFractionDigits: 2})}</h4>
      </div>
      <button onClick={resetValues} className="reset-btn">Reset</button>
    </div>
  );
};

export default WhatIfSimulator;