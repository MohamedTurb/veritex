import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';
import { ThemeProvider } from '../../context/ThemeContext';
import Home from '../../pages/Home';

const HomeWithProviders = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Home />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('Home Page Performance', () => {
  beforeEach(() => {
    // Clear performance metrics
    performance.clearMarks();
    performance.clearMeasures();
  });

  it('should render home page within acceptable time', () => {
    const startTime = performance.now();
    render(<HomeWithProviders />);
    const endTime = performance.now();

    const renderTime = endTime - startTime;
    expect(renderTime).toBeLessThan(1000); // Should render in less than 1 second
  });

  it('should display hero section quickly', () => {
    render(<HomeWithProviders />);
    const heroHeading = screen.getByRole('heading', { level: 1 });
    expect(heroHeading).toBeInTheDocument();
  });

  it('should not cause layout shifts when loading images', async () => {
    const { container } = render(<HomeWithProviders />);
    const images = container.querySelectorAll('img');

    // Verify images have dimensions to prevent layout shift
    images.forEach((img) => {
      expect(img.getAttribute('width') || img.style.width).toBeTruthy();
      expect(img.getAttribute('height') || img.style.height).toBeTruthy();
    });
  });

  it('should handle interactions without jank', () => {
    render(<HomeWithProviders />);
    const startTime = performance.now();

    // Simulate user interaction
    const buttons = screen.queryAllByRole('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }

    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100); // Interaction should be responsive
  });
});
