import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

/**
 * Custom render function that wraps components with required providers
 */
export function renderWithProviders(
  ui,
  {
    initialState = {},
    store = null,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Create a router for testing
 */
export function createMockRouter(initialEntries = ['/']) {
  return createMemoryHistory({ initialEntries });
}

/**
 * Wait for async operations
 */
export function waitForLoadingToFinish() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

export * from '@testing-library/react';
