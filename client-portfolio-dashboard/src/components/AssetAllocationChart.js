import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import '../index.css';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const AssetAllocationChart = ({ 
  data = { 
    stocks: 0, 
    bonds: 0, 
    cash: 0, 
    other: 0 
  } 
}) => {
  const chartData = {
    labels: ['Stocks', 'Bonds', 'Cash', 'Other'],
    datasets: [
      {
        data: [data.stocks, data.bonds, data.cash, data.other],
        backgroundColor: [
          '#4BC0C0',
          '#36A2EB',
          '#FFCE56',
          '#FF6384'
        ],
        hoverBackgroundColor: [
          '#4BC0C0',
          '#36A2EB',
          '#FFCE56',
          '#FF6384'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="chart-container">
      <h3>Asset Allocation</h3>
      <div className="chart-wrapper">
        <Pie data={chartData} options={options} />
      </div>
      <div className="chart-legend">
        <p>Stocks: {data.stocks}%</p>
        <p>Bonds: {data.bonds}%</p>
        <p>Cash: {data.cash}%</p>
        {data.other > 0 && <p>Other: {data.other}%</p>}
      </div>
    </div>
  );
};

AssetAllocationChart.propTypes = {
  data: PropTypes.shape({
    stocks: PropTypes.number.isRequired,
    bonds: PropTypes.number.isRequired,
    cash: PropTypes.number.isRequired,
    other: PropTypes.number
  })
};

export default AssetAllocationChart;