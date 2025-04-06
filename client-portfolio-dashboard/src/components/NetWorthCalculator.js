import React, { useState, useMemo } from 'react';
import '../index.css';

const NetWorthCalculator = () => {
  const [assets, setAssets] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [error, setError] = useState('');

  // Use useMemo to prevent unnecessary recalculations
  const netWorth = useMemo(() => {
    if (assets === '' || liabilities === '') return null;
    
    const assetsNum = parseFloat(assets);
    const liabilitiesNum = parseFloat(liabilities);
    
    if (isNaN(assetsNum)) {
      setError('Please enter valid numbers');
      return null;
    }
    
    if (isNaN(liabilitiesNum)) {
      setError('Please enter valid numbers');
      return null;
    }
    
    setError('');
    return assetsNum - liabilitiesNum;
  }, [assets, liabilities]);

  const handleAssetsChange = (e) => {
    setAssets(e.target.value);
  };

  const handleLiabilitiesChange = (e) => {
    setLiabilities(e.target.value);
  };

  return (
    <div className="calculator">
      <h3>Net Worth Calculator</h3>
      <div className="input-group">
        <label>
          Assets:
          <input
            type="text"
            value={assets}
            onChange={handleAssetsChange}
            placeholder="Total assets value"
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Liabilities:
          <input
            type="text"
            value={liabilities}
            onChange={handleLiabilitiesChange}
            placeholder="Total liabilities value"
          />
        </label>
      </div>
      {error && <div className="error">{error}</div>}
      {netWorth !== null && !error && (
        <div className="result">
          <h4>Net Worth: ${netWorth.toLocaleString()}</h4>
        </div>
      )}
    </div>
  );
};

export default NetWorthCalculator;