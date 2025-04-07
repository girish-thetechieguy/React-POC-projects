import { render } from '@testing-library/react';
import AssetAllocationChart from '../AssetAllocationChart';

// Mock Chart.js to avoid canvas issues in tests
jest.mock('react-chartjs-2', () => ({
  Pie: () => <canvas data-testid="pie-chart-mock" />
}));

describe('Asset Allocation Chart', () => {
  const mockData = {
    stocks: 60,
    bonds: 30,
    cash: 10
  };

  test('renders chart with correct props', () => {
    const { getByTestId } = render(<AssetAllocationChart data={mockData} />);
    expect(getByTestId('pie-chart-mock')).toBeInTheDocument();
  });

  test('displays legend with allocation percentages', () => {
    const { getByText } = render(<AssetAllocationChart data={mockData} />);
    
    expect(getByText(/Stocks: 60%/i)).toBeInTheDocument();
    expect(getByText(/Bonds: 30%/i)).toBeInTheDocument();
    expect(getByText(/Cash: 10%/i)).toBeInTheDocument();
  });
});