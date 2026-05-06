/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';
import { ThemeProvider } from '../../context/ThemeContext';
import Checkout from '../../pages/Checkout';

expect.extend(toHaveNoViolations);

const seedCheckoutState = () => {
  localStorage.setItem('veritex_cart', JSON.stringify([
    {
      id: 101,
      title: 'QA Hoodie',
      price: 100,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
    },
  ]));

  localStorage.setItem('veritex_admin_offers', JSON.stringify([
    {
      id: 'OFR-QA',
      code: 'SAVE10',
      discount: 10,
      active: true,
      expiresAt: '2026-12-31',
    },
  ]));
};

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
  beforeEach(() => {
    localStorage.clear();
    seedCheckoutState();
    window.history.pushState({}, '', '/checkout');
  });

  it('should not have any accessibility violations', async () => {
    const { container } = render(<CheckoutWithProviders />);
    await screen.findByRole('heading', { name: /checkout/i });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper form labels', async () => {
    render(<CheckoutWithProviders />);
    expect(await screen.findByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
  });

  it('should have accessible form inputs', async () => {
    render(<CheckoutWithProviders />);
    await screen.findByLabelText(/first name/i);
    expect(document.querySelectorAll('input').length).toBeGreaterThan(0);
  });
});
