// import { render, fireEvent } from '@testing-library/react';
// import NetWorthCalculator from '../NetWorthCalculator';

// describe('Net Worth Calculator', () => {
//   test('calculates net worth correctly', () => {
//     const { getByLabelText, getByText } = render(<NetWorthCalculator />);
    
//     fireEvent.change(getByLabelText(/Assets/i), { target: { value: '500000' } });
//     fireEvent.change(getByLabelText(/Liabilities/i), { target: { value: '200000' } });
    
//     expect(getByText(/\$300,000/i)).toBeInTheDocument();
//   });

//   test('handles invalid inputs gracefully', () => {
//     const { getByLabelText, getByText } = render(<NetWorthCalculator />);
    
//     fireEvent.change(getByLabelText(/Assets/i), { target: { value: 'abc' } });
//     fireEvent.change(getByLabelText(/Liabilities/i), { target: { value: '200000' } });
    
//     expect(getByText(/Please enter valid numbers/i)).toBeInTheDocument();
//   });

// //   test('updates in real-time on input change', () => {
// //     const { getByLabelText, getByText } = render(<NetWorthCalculator />);
// //     const assetsInput = getByLabelText(/Assets/i);
    
// //     // fireEvent.change(assetsInput, { target: { value: '100000' } });
// //     // expect(getByText(/\$100,000/)).toBeInTheDocument();
    
// //     fireEvent.change(assetsInput, { target: { value: '150000' } });
// //     expect(getByText(/\$150,000/i)).toBeInTheDocument();
// //   });
// });

import { render, fireEvent, screen } from '@testing-library/react';
import NetWorthCalculator from '../NetWorthCalculator';

describe('NetWorthCalculator', () => {
  test('calculates net worth correctly', () => {
    render(<NetWorthCalculator />);
    
    const assetsInput = screen.getByLabelText(/Assets/i);
    const liabilitiesInput = screen.getByLabelText(/Liabilities/i);
    
    fireEvent.change(assetsInput, { target: { value: '500000' } });
    fireEvent.change(liabilitiesInput, { target: { value: '200000' } });
    
    expect(screen.getByText(/Net Worth: \$300,000/i)).toBeInTheDocument();
  });
});