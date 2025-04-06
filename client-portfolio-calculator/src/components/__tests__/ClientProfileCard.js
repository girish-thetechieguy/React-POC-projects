// src/components/__tests__/ClientProfileCard.test.js
import React from 'react';
import { render } from '@testing-library/react';
import ClientProfileCard from '../ClientProfileCard';

test('renders client name and net worth', () => {
  const client = { name: 'John Doe', netWorth: 100000, strategy: 'Conservative' };
  const { getByText } = render(<ClientProfileCard client={client} />);
  
  expect(getByText(/John Doe/i)).toBeInTheDocument();
  expect(getByText(/\$100,000/i)).toBeInTheDocument();
});