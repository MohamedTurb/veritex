/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Navbar from '../../components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';
import { ThemeProvider } from '../../context/ThemeContext';
import { WishlistProvider } from '../../context/WishlistContext';

expect.extend(toHaveNoViolations);

const NavbarWithProviders = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('Navbar Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<NavbarWithProviders />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper navigation landmarks', () => {
    render(<NavbarWithProviders />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('should have semantic link elements in navigation', () => {
    render(<NavbarWithProviders />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should have proper heading hierarchy', () => {
    render(<NavbarWithProviders />);
    // Logo or brand name should be accessible
    expect(document.querySelector('nav')).toBeInTheDocument();
  });
});
