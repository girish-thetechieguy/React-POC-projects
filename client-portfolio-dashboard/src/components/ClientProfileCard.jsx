import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';

const ClientProfileCard = ({ client }) => {
  if (!client) {
    return <div data-testid="loading-placeholder" className="profile-card loading">Loading client data...</div>;
  }

  return (
    <div className="profile-card">
      <h2>{client.name}</h2>
      <div className="profile-details">
        <p><strong>Age:</strong> {client.age} years</p>
        <p><strong>Risk Tolerance:</strong> {client.riskTolerance}</p>
        <p><strong>Portfolio Value:</strong> ${client.portfolioValue.toLocaleString()}</p>
      </div>
    </div>
  );
};

ClientProfileCard.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    riskTolerance: PropTypes.string.isRequired,
    portfolioValue: PropTypes.number.isRequired
  })
};

export default ClientProfileCard;