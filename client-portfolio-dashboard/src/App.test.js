import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Client Portfolio Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});

test('updates net worth when asset allocation changes', () => {
  render(<App />);
  
  // Find the stocks display element (assuming it shows the percentage)
  const stocksDisplay = screen.getByText(/Stocks: \d+%/i);
  const initialValue = stocksDisplay.textContent;
  
  // Find the allocation control (now using test-id since no label exists)
  const allocationControl = screen.getByTestId('stocks-allocation-control');
  
  // Simulate changing the allocation
  fireEvent.change(allocationControl, {
    target: { value: '70' }
  });
  
  // Verify the display updated
  expect(stocksDisplay).not.toHaveTextContent(initialValue);
  expect(stocksDisplay).toHaveTextContent('70%');
});
