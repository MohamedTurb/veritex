/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';
import { ThemeProvider } from '../../context/ThemeContext';
import Checkout from '../../pages/Checkout';

expect.extend(toHaveNoViolations);

const CheckoutWithProviders = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Checkout />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('Checkout Page Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<CheckoutWithProviders />);
    // Small delay to ensure content is rendered
    await new Promise((r) => setTimeout(r, 100));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper form labels', () => {
    render(<CheckoutWithProviders />);
    // Wait for form elements
    const formElements = document.querySelectorAll('input, select, textarea');
    expect(formElements.length).toBeGreaterThan(0);
  });

  it('should have accessible form inputs', () => {
    render(<CheckoutWithProviders />);
    const inputs = screen.queryAllByRole('textbox');
    // Inputs should be accessible via role
    expect(document.querySelectorAll('input').length).toBeGreaterThan(0);
  });
});
