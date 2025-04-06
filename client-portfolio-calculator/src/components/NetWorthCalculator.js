// src/components/NetWorthCalculator.js
import React from 'react';

const NetWorthCalculator = ({ netWorth }) => {
  return (
    <div>
      <h3>Live Net Worth Calculator</h3>
      <p>Your Net Worth: ${netWorth.toLocaleString()}</p>
    </div>
  );
};

export default NetWorthCalculator;