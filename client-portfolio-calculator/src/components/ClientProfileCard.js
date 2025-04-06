// src/components/ClientProfileCard.js
import React from 'react';

const ClientProfileCard = ({ client }) => {
  return (
    <div className="profile-card">
      <h2>{client.name}</h2>
      <p>Net Worth: ${client.netWorth.toLocaleString()}</p>
      <p>Investment Strategy: {client.strategy}</p>
    </div>
  );
};

export default ClientProfileCard;