import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('Protected QA flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects unauthenticated users to login when visiting testing dashboard', async () => {
    window.history.pushState({}, '', '/testing-dashboard');

    render(<App />);

    expect(await screen.findByText('Welcome back')).toBeInTheDocument();
  });

  it('allows login with demo account and opens testing dashboard', async () => {
    window.history.pushState({}, '', '/testing-dashboard');

    render(<App />);

    const email = await screen.findByPlaceholderText('you@example.com');
    const password = screen.getByPlaceholderText('••••••••');

    fireEvent.change(email, { target: { value: 'testing@veritex.com' } });
    fireEvent.change(password, { target: { value: 'Testing123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Software Testing Dashboard')).toBeInTheDocument();
    }, { timeout: 4000 });
  });
});
