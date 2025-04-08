import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Investment Alert System', () => {
  render(<App />);
  const linkElement = screen.getByText(/Investment Alert System/i);
  expect(linkElement).toBeInTheDocument();
});
