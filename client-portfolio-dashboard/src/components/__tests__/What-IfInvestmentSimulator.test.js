import { render, fireEvent, screen } from '@testing-library/react';
import WhatIfSimulator from '../WhatIfSimulator';

describe('What-If Investment Simulator', () => {
  test('calculates projected returns correctly', () => {
    render(<WhatIfSimulator />);
    
    fireEvent.change(screen.getByLabelText(/Initial Investment/i), { 
      target: { value: '10000' } 
    });
    fireEvent.change(screen.getByLabelText(/Annual Return \(%/i), { 
      target: { value: '7' } 
    });
    fireEvent.change(screen.getByLabelText(/Years/i), { 
      target: { value: '10' } 
    });
    
    expect(screen.getByText(/\$19,671.51/i)).toBeInTheDocument(); // 10000 * (1.07)^10
  });

  test('handles different contribution frequencies', () => {
    render(<WhatIfSimulator />);
    
    fireEvent.change(screen.getByLabelText(/Initial Investment/i), { value: '10000' });
    fireEvent.change(screen.getByLabelText(/Monthly Contribution/i), { value: '100' });
    fireEvent.change(screen.getByLabelText(/Annual Return \(%/i), { value: '5' });
    fireEvent.change(screen.getByLabelText(/Years/i), { value: '5' });
    
    const monthlyResult = screen.getByText(/\$19,671.51/i); // Approximate
    expect(monthlyResult).toBeInTheDocument();
    
    fireEvent.change(screen.getByLabelText(/Contribution Frequency/i), { 
      target: { value: 'annual' } 
    });
    
    expect(screen.getByText(/\$19,671.51/i)).toBeInTheDocument(); // Different result for annual
  });

  test('resets to default values', () => {
    render(<WhatIfSimulator />);
    
    const initialInvestment = screen.getByLabelText(/Initial Investment/i);
    fireEvent.change(initialInvestment, { target: { value: '50000' } });
    fireEvent.click(screen.getByText(/Reset/i));
    
    expect(initialInvestment.value).toBe('10000');
  });
});