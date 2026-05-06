/* eslint-disable no-undef */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('Auth QA flows', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('opens the forgot password screen and confirms reset email delivery', async () => {
    window.history.pushState({}, '', '/login');

    render(<App />);

    fireEvent.click(screen.getByRole('link', { name: /forgot password/i }));

    expect(await screen.findByRole('heading', { name: /reset your password/i })).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'testing@veritex.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    await waitFor(() => {
      expect(screen.getByText('Reset link sent. Check your inbox and return to sign in.')).toBeInTheDocument();
    });
  });

  it('shows a login error for invalid credentials', async () => {
    window.history.pushState({}, '', '/login');

    render(<App />);

    fireEvent.change(await screen.findByPlaceholderText('you@example.com'), {
      target: { value: 'bad@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });
});