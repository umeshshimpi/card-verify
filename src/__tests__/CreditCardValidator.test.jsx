import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreditCardValidator from '../components/CreditCardValidator';

// Mock card images to avoid loading actual images in tests
jest.mock('../assets/images/visa.png', () => 'mock-visa.png');
jest.mock('../assets/images/mastercard.png', () => 'mock-mastercard.png');
jest.mock('../assets/images/discover.png', () => 'mock-discover.png');

describe('CreditCardValidator Component', () => {
  test('renders without crashing', () => {
    render(<CreditCardValidator />);
    expect(screen.getByText(/credit card validator/i)).toBeInTheDocument();
  });

  test('validates a valid card number', async () => {
    render(<CreditCardValidator />);
    const input = screen.getByPlaceholderText(/enter credit card number/i);
    const button = screen.getByText(/validate/i);

    fireEvent.change(input, { target: { value: '4111111111111111' } });
    fireEvent.click(button);

    const resultElement = await screen.findByText(/valid credit card number/i);
    expect(resultElement).toBeInTheDocument();

    expect(resultElement).toHaveTextContent('Valid credit card number.');
  });

  test('detects an invalid card number', async () => {
    render(<CreditCardValidator />);
    const input = screen.getByPlaceholderText(/enter credit card number/i);
    const button = screen.getByText(/validate/i);

    fireEvent.change(input, { target: { value: '1234567890123456' } });
    fireEvent.click(button);

    const resultElement = await screen.findByText(/invalid credit card number/i);
    expect(resultElement).toBeInTheDocument();

    expect(resultElement).toHaveTextContent('Invalid credit card number.');
  });

  test('handles non-numeric input', () => {
    render(<CreditCardValidator />);
    const input = screen.getByPlaceholderText(/enter credit card number/i);
    const button = screen.getByText(/validate/i);

    fireEvent.change(input, { target: { value: 'abcd1234' } });
    fireEvent.click(button);

    expect(screen.getByText(/only numeric characters are allowed/i)).toBeInTheDocument();
  });
});
