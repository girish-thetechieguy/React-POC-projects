import { render, screen } from '@testing-library/react';
import ClientProfileCard from '../ClientProfileCard';

describe('Client Profile Card', () => {
  const mockClient = {
    name: 'John Doe',
    age: 45,
    riskTolerance: 'Moderate',
    portfolioValue: 250000
  };

  test('renders client information correctly', () => {
    render(<ClientProfileCard client={mockClient} />);
    
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/45 years/i)).toBeInTheDocument();
    expect(screen.getByText(/Moderate/i)).toBeInTheDocument();
    expect(screen.getByText(/\$250,000/i)).toBeInTheDocument();
  });

  test('displays placeholder when client data is loading', () => {
    render(<ClientProfileCard client={null} />);
    expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
  });
});